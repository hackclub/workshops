import { Box, Link } from 'theme-ui'

const outerContainerStyles = {
  "margin-left": "auto",
  "margin-right": "auto",
  border: "0.5px solid black",
  padding: "10px",
  "margin-bottom": "10px",
  "border-radius": "5px",
  cursor: "pointer",
  display: "flex",
  transition: "box-shadow .5s ease-out, scale .5s ease-out",
  transform: "scale(1)",
  boxShadow: "0px 0px 0px 0px rgb(0 0 0 0 / 0%)",
  "&:hover": {
    transform: "scale(1.0625)",
    boxShadow: "0 1px 2px rgb(0 0 0 / 6%), 0 8px 12px rgb(0 0 0 / 13%)"
  }
}

const linkContainerStyles = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",

}

export const GamelabAnnouncement = () => (
  <Box 
    sx={outerContainerStyles} 
    onClick={() => window.open("https://scrapbook.hackclub.com/r/gamelab/")}>
    <img style={{ "padding-right": "10px" }} src="/announcementIcon.svg" alt="announcement icon"></img>
    <div style={linkContainerStyles}>
      <strong style={{ color: "var(--theme-ui-colors-primary)"}}>Help fill the Game Lab Arcade!</strong>
      <div>Orpheus needs your little games to travel back to the present!</div>
    </div>
  </Box>
)
