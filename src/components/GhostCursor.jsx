import { useEffect, useRef } from 'react'

const VERT_SHADER = `
precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAG_SHADER = `
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform float u_size;
uniform vec2 u_pointer;
uniform float u_smile;
uniform vec2 u_target_pointer;
uniform vec3 u_main_color;
uniform vec3 u_border_color;
uniform float u_flat_color;
uniform sampler2D u_texture;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
vec2 rotate(vec2 v, float angle) {
  float r_sin = sin(angle);
  float r_cos = cos(angle);
  return vec2(v.x * r_cos - v.y * r_sin, v.x * r_sin + v.y * r_cos);
}

float eyes(vec2 uv) {
  uv.y -= .5;
  uv.x *= 1.;
  uv.y *= .8;
  uv.x = abs(uv.x);
  uv.y += u_smile * .3 * pow(uv.x, 1.3);
  uv.x -= (.6 + .2 * u_smile);

  float d = clamp(length(uv), 0., 1.);
  return 1. - pow(d, .08);
}

float mouth(vec2 uv) {
  uv.y += 1.5;

  uv.x *= (.5 + .5 * abs(1. - u_smile));
  uv.y *= (3. - 2. * abs(1. - u_smile));
  uv.y -= u_smile * 4. * pow(uv.x, 2.);

  float d = clamp(length(uv), 0., 1.);
  return 1. - pow(d, .07);
}

float face(vec2 uv, float rotation) {
  uv = rotate(uv, rotation);
  uv /= (.27 * u_size);

  float eyes_shape = 10. * eyes(uv);
  float mouth_shape = 20. * mouth(uv);

  float col = 0.;
  col = mix(col, 1., eyes_shape);
  col = mix(col, 1., mouth_shape);

  return col;
}

void main() {
  vec2 point = u_pointer;
  point.x *= u_ratio;

  vec2 uv = vUv;
  uv.x *= u_ratio;
  uv -= point;

  float texture = texture2D(u_texture, vec2(vUv.x, 1. - vUv.y)).r;
  float shape = texture;

  float noise = snoise(uv * vec2(.7 / u_size, .6 / u_size) + vec2(0., .0015 * u_time));
  noise += 1.2;
  noise *= 2.1;
  noise += smoothstep(-.8, -.2, (uv.y) / u_size);

  float face = face(uv, 5. * (u_target_pointer.x - u_pointer.x));
  shape -= face;

  shape *= noise;

  vec3 border = (1. - u_border_color);
  border.g += .2 * sin(.005 * u_time);
  border *= .5;

  vec3 color = u_main_color;
  color -= (1. - u_flat_color) * border * smoothstep(.0, .01, shape);

  shape = u_flat_color * smoothstep(.8, 1., shape) + (1. - u_flat_color) * shape;
  color *= shape;

  gl_FragColor = vec4(color, shape);
}
`

export default function GhostCursor() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const devicePixelRatio = Math.min(window.devicePixelRatio ?? 1, 2)

    canvasEl.style.position = 'fixed'
    canvasEl.style.left = '0px'
    canvasEl.style.top = '0px'
    canvasEl.style.pointerEvents = 'none'
    canvasEl.style.zIndex = '40'

    const mouseThreshold = 0.1
    const params = {
      size: 0.1,
      tail: {
        dotsNumber: 25,
        spring: 1.4,
        friction: 0.3,
        gravity: 0,
      },
      smile: 1,
      mainColor: [0.98, 0.96, 0.96],
      borderColor: [0.2, 0.5, 0.7],
      isFlatColor: false,
    }

    const mouse = {
      x: 0.25 * window.innerWidth,
      y: 0.8 * window.innerHeight,
      tX: 0.25 * window.innerWidth,
      tY: 0.8 * window.innerHeight,
      moving: false,
      controlsPadding: 0,
    }

    const textureEl = document.createElement('canvas')
    const textureCtx = textureEl.getContext('2d')
    if (!textureCtx) return

    const dotSize = (i) =>
      params.size *
      window.innerHeight *
      (1 - 0.2 * Math.pow((3 * i) / params.tail.dotsNumber - 1, 2))

    const pointerTrail = new Array(params.tail.dotsNumber)
    for (let i = 0; i < params.tail.dotsNumber; i++) {
      pointerTrail[i] = {
        x: mouse.x,
        y: mouse.y,
        vx: 0,
        vy: 0,
        opacity: 0.04 + 0.3 * Math.pow(1 - i / params.tail.dotsNumber, 4),
        bordered: 0.6 * Math.pow(1 - i / pointerTrail.length, 1),
        r: dotSize(i),
      }
    }

    const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl')
    if (!gl) return

    const createShader = (sourceCode, type) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, sourceCode)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('GhostCursor shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(VERT_SHADER, gl.VERTEX_SHADER)
    const fragmentShader = createShader(FRAG_SHADER, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('GhostCursor program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const uniforms = {}
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; i++) {
      const name = gl.getActiveUniform(program, i)?.name
      if (!name) continue
      uniforms[name] = gl.getUniformLocation(program, name)
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const canvasTexture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, canvasTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl)
    if (uniforms.u_texture) gl.uniform1i(uniforms.u_texture, 0)

    if (uniforms.u_size) gl.uniform1f(uniforms.u_size, params.size)
    if (uniforms.u_main_color) {
      gl.uniform3f(uniforms.u_main_color, params.mainColor[0], params.mainColor[1], params.mainColor[2])
    }
    if (uniforms.u_border_color) {
      gl.uniform3f(uniforms.u_border_color, params.borderColor[0], params.borderColor[1], params.borderColor[2])
    }
    if (uniforms.u_flat_color) gl.uniform1f(uniforms.u_flat_color, params.isFlatColor ? 1 : 0)

    let movingTimer = window.setTimeout(() => {
      mouse.moving = false
    }, 300)

    const updateMousePosition = (eX, eY) => {
      mouse.moving = true
      if (mouse.controlsPadding < 0) mouse.moving = false

      window.clearTimeout(movingTimer)
      movingTimer = window.setTimeout(() => {
        mouse.moving = false
      }, 300)

      mouse.tX = eX

      const size = params.size * window.innerHeight
      let y = eY - 0.6 * size
      mouse.tY = y > size ? y : size
      mouse.tY -= mouse.controlsPadding
    }

    const onMouseMove = (e) => updateMousePosition(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const t = e.targetTouches?.[0]
      if (!t) return
      updateMousePosition(t.clientX, t.clientY)
    }
    const onClick = (e) => updateMousePosition(e.clientX, e.clientY)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('click', onClick)

    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth * devicePixelRatio
      canvasEl.height = window.innerHeight * devicePixelRatio
      textureEl.width = window.innerWidth
      textureEl.height = window.innerHeight

      gl.viewport(0, 0, canvasEl.width, canvasEl.height)
      if (uniforms.u_ratio) gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height)

      for (let i = 0; i < params.tail.dotsNumber; i++) {
        pointerTrail[i].r = dotSize(i)
      }
    }

    const updateTexture = () => {
      textureCtx.fillStyle = 'black'
      textureCtx.fillRect(0, 0, textureEl.width, textureEl.height)

      pointerTrail.forEach((p, pIdx) => {
        if (pIdx === 0) {
          p.x = mouse.x
          p.y = mouse.y
        } else {
          p.vx += (pointerTrail[pIdx - 1].x - p.x) * params.tail.spring
          p.vx *= params.tail.friction

          p.vy += (pointerTrail[pIdx - 1].y - p.y) * params.tail.spring
          p.vy *= params.tail.friction
          p.vy += params.tail.gravity

          p.x += p.vx
          p.y += p.vy
        }

        const grd = textureCtx.createRadialGradient(p.x, p.y, p.r * p.bordered, p.x, p.y, p.r)
        grd.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)')

        textureCtx.beginPath()
        textureCtx.fillStyle = grd
        textureCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        textureCtx.fill()
      })
    }

    const render = () => {
      const currentTime = performance.now()
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, currentTime)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (mouse.moving) {
        params.smile -= 0.05
        params.smile = Math.max(params.smile, -0.1)
        params.tail.gravity -= 10 * params.size
        params.tail.gravity = Math.max(params.tail.gravity, 0)
      } else {
        params.smile += 0.01
        params.smile = Math.min(params.smile, 1)
        if (params.tail.gravity > 25 * params.size) {
          params.tail.gravity = (25 + 5 * (1 + Math.sin(0.002 * currentTime))) * params.size
        } else {
          params.tail.gravity += params.size
        }
      }

      mouse.x += (mouse.tX - mouse.x) * mouseThreshold
      mouse.y += (mouse.tY - mouse.y) * mouseThreshold

      if (uniforms.u_smile) gl.uniform1f(uniforms.u_smile, params.smile)
      if (uniforms.u_pointer) {
        gl.uniform2f(uniforms.u_pointer, mouse.x / window.innerWidth, 1 - mouse.y / window.innerHeight)
      }
      if (uniforms.u_target_pointer) {
        gl.uniform2f(uniforms.u_target_pointer, mouse.tX / window.innerWidth, 1 - mouse.tY / window.innerHeight)
      }

      updateTexture()
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, canvasTexture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl)

      rafRef.current = window.requestAnimationFrame(render)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    render()

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('click', onClick)
      window.clearTimeout(movingTimer)
    }
  }, [])

  return <canvas ref={canvasRef} />
}
