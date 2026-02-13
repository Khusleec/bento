import Tile from './Tile'

export default function PhotoCard() {
  return (
    <Tile
      area="d"
      fill="dark"
      showChrome={true}
      label="Profile"
      clickable={false}
      labelAlign="center"
      labelRestPosition="top-right"
      borderRadius="50% 16px 50% 50%"
    >
      <div className="h-full w-full" />
    </Tile>
  )
}
