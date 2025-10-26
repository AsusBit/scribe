# Scribe - Write Once, Invite All

![Scribe Logo](public/logo192.png)

It takes effort and time to write down every person's name on your invitation template. So I have made this app to take your list of names, make you choose where you want to place them, with their styles and all, and finally downloads all of your names into a zip.

## Features

- **Image Upload**: Support for PNG and JPEG formats
- **Real-time Preview**: See your changes as you make them
- **Text Customization**:
  - Multiple font options
  - Adjustable font size
  - Various color choices
  - Custom coloring using slider, RGB, or even Hexadecimal values
  - Draggable text positioning
  - Rotation and scaling capabilities
- **Batch Processing**: Generate multiple personalized invitations at once
- **Processing Lists of Names**: Using sheets from either .CSV or Excel sheets
- **Bulk Download**: Download all variations as a ZIP file
- **Responsive Design**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AsusBit/scribe.git
```

2. Navigate to the project directory:
```bash
cd scribe
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

1. Click "Get Started" or scroll to the upload section
2. Upload your invitation image
3. Use the customization tools to:
   - Add and position text
   - Choose fonts and colors
   - Adjust text size
4. Add recipient names to the list
5. Download individual invitations or generate all at once

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Fabric.js](http://fabricjs.com/) - Canvas manipulation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [JSZip](https://stuk.github.io/jszip/) - ZIP file generation
- [jsPDF](https://github.com/parallax/jsPDF) - Turning the pictures into installable PDFs
- [papaparse](https://github.com/mholt/PapaParse) - Parsing names from CSV files
- [SheetJS](https://www.npmjs.com/package/xlsx) - Parsing names from Excel sheets


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
   

## Acknowledgments

- Font families provided by Google Fonts
- Icons and design inspiration from various open-source projects (svgrepo.com)

Project Link: [https://scribe-one.vercel.app/](https://scribe-one.vercel.app/)

## Future Enhancements

- Additional font options
- More customization tools

---

Made by [Hamzah AlNofli](https://github.com/AsusBit)
