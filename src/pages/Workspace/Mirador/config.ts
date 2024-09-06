// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  id: "papyrus46",
  window: {
    allowClose: false, // Configure if windows can be closed or not
    allowFullscreen: false, // Configure to show a "fullscreen" button in the WindowTopBar
    allowMaximize: false, // Configure if windows can be maximized or not
    allowTopMenuButton: false, // Configure if window view and thumbnail display menu are visible
    allowWindowSideBar: true, // Configure if side bar menu is visible or not
    authNewWindowCenter: "parent", // Configure how to center a new window created by the authentication flow. Options: parent, screen
    defaultSidebarPanelHeight: 201, // Configure default sidebar height in pixels
    defaultSidebarPanelWidth: 400, // Configure default sidebar width in pixels
    defaultView: "single", // Configure which viewing mode (e.g. single, book, gallery) for windows to be opened in
    forceDrawAnnotations: false,
    hideWindowTitle: false, // Configure if the window title is shown in the window title bar or not
    highlightAllAnnotations: false, // Configure whether to display annotations on the canvas
    imageToolsEnabled: true,
    imageToolsOpen: false,
    showLocalePicker: false, // Configure locale picker for multi-lingual metadata
    sideBarOpen: false, // Configure if the sidebar (and its content panel) is open by default
    sideBarPanel: "info", // Configure which sidebar is selected by default. Options: info, attribution, canvas, annotations, search
  },
  windows: [],
  workspace: {
    type: "mosaic",
    showZoomControls: true,
  },
  workspaceControlPanel: {
    enabled: false, // Remove extra workspace settings
  },
  views: [{ key: "single", behaviors: ["individuals"] }],
  theme: {
    palette: {
      primary: {
        main: "#c9ac5f",
      },
      secondary: {
        main: "#65743a",
      },
      shades: {
        // Shades that can be used to offset color areas of the Workspace / Window
        dark: "#d6d6d6",
        main: "fbfafb",
        light: "#ebebeb",
      },
    },
  },
};

export default config;
