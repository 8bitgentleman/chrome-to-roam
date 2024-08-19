# Chrome-To-Roam

Chrome-To-Roam is a Chrome extension that allows you to send selected text and page URLs directly to your Roam Research graph. It provides a seamless way to capture and organize information from the web into your Roam Research notes.

## Features

- **Context Menu Integration**: Right-click on selected text and choose "Send to Roam Research" to send the text and page URL to your Roam Research graph.
- **Keyboard Shortcut**: Use a keyboard shortcut to send the current page URL and title to Roam Research.
- **Customizable Settings**: Configure your Roam Research graph name and edit token via the extension options.

## Installation

### Step 1: Download the Extension

1. Download the latest release of Chrome-To-Roam from the [Releases](https://github.com/your-repo/releases) page. Make sure to download the `chrome-to-roam.zip` file.

### Step 2: Extract the Zip File

1. Extract the contents of the `chrome-to-roam.zip` file to a directory on your local machine.

### Step 3: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on the "Load unpacked" button.
4. Select the directory where you extracted the `chrome-to-roam.zip` file.

The Chrome-To-Roam extension should now be installed and ready to use.

## Usage

### Context Menu

1. Highlight the text you want to send to Roam.
2. Right-click and select "Send to Roam Research" from the context menu.
3. The selected text and page URL will be sent to your Roam Research graph.

### Keyboard Shortcut

1. Press the keyboard shortcut (default is `Ctrl+Shift+U` on Windows/Linux or `Command+Shift+U` on macOS) to send the current page URL and title to Roam Research.

## Configuration

Before using the extension, you need to set your Roam Research graph name and edit token.

### Options Page

1. Click on the extension icon in the Chrome toolbar.
2. Select "Options".
3. Enter your Roam Research graph name and edit token in the respective fields.
4. Click "Save".

### Popup

1. Click on the extension icon in the Chrome toolbar.
2. Enter your Roam Research graph name and edit token in the respective fields.
3. Click "Save".

## Development

### Dependencies

This extension uses the `@roam-research/roam-api-sdk` for interacting with the Roam Research API.

### Building and Testing

To build and test the extension locally:

1. Make changes to the source files.
2. Reload the extension in Chrome by navigating to `chrome://extensions/` and clicking the "Reload" button next to the extension.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Note**: Ensure you have the necessary permissions and API tokens to use this extension with your Roam Research account.