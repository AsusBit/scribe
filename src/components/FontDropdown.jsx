import { useState, useRef, useEffect } from 'react';

export default function FontDropdown({ onChange, value }) {
    const [isOpen, setIsOpen] = useState(false);
    const [customFonts, setCustomFonts] = useState([]);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load custom fonts from localStorage on mount
    useEffect(() => {
        const savedFonts = localStorage.getItem('customFonts');
        if (savedFonts) {
            const fonts = JSON.parse(savedFonts);
            setCustomFonts(fonts);
            // Re-apply font faces
            fonts.forEach(font => {
                loadFontFace(font.fontFamily, font.dataUrl);
            });
        }
    }, []);

    const loadFontFace = (fontFamily, dataUrl) => {
        const fontFace = new FontFace(fontFamily, `url(${dataUrl})`);
        fontFace.load().then(() => {
            document.fonts.add(fontFace);
        }).catch(err => {
            console.error('Error loading font:', err);
        });
    };

    const handleFontUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if it's a font file
        const validTypes = ['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'application/x-font-ttf', 'application/x-font-otf'];
        const isValidFont = validTypes.includes(file.type) || 
                          file.name.match(/\.(ttf|otf|woff|woff2)$/i);

        if (!isValidFont) {
            alert('Please select a valid font file (.ttf, .otf, .woff, .woff2)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const fontName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
            const fontFamily = `custom-${fontName.replace(/[^a-zA-Z0-9]/g, '-')}`;

            // Create font face and add to document
            loadFontFace(fontFamily, dataUrl);

            // Create custom font object
            const customFont = {
                value: fontFamily,
                label: `${fontName} (Custom)`,
                className: `font-custom`,
                fontFamily: fontFamily,
                dataUrl: dataUrl,
                fileName: file.name
            };

            // Check if font already exists
            const existingFontIndex = customFonts.findIndex(f => f.fileName === file.name);
            let updatedCustomFonts;
            
            if (existingFontIndex !== -1) {
                // Replace existing font
                updatedCustomFonts = [...customFonts];
                updatedCustomFonts[existingFontIndex] = customFont;
            } else {
                // Add new font
                updatedCustomFonts = [...customFonts, customFont];
            }

            // Update state and localStorage
            setCustomFonts(updatedCustomFonts);
            localStorage.setItem('customFonts', JSON.stringify(updatedCustomFonts));

            // Auto-select the uploaded font
            onChange(fontFamily);
        };

        reader.readAsDataURL(file);
        // Clear the input
        event.target.value = '';
    };

    const removeCustomFont = (fontToRemove) => {
        const updatedFonts = customFonts.filter(font => font.value !== fontToRemove.value);
        setCustomFonts(updatedFonts);
        localStorage.setItem('customFonts', JSON.stringify(updatedFonts));
        
        // If the removed font was selected, reset to default
        if (value === fontToRemove.value) {
            onChange('Roboto');
        }
    };

    const fonts = [
        // Latin Fonts
        { value: 'Gentium Book Plus', label: 'Gentium Book Plus', className: 'font-gentium' },
        { value: 'Finlandica', label: 'Finlandica', className: 'font-finlandica' },
        { value: 'AA Tasneem Regular', label: 'AA Tasneem Regular', className: 'font-tasneem'},
        { value: 'Roboto', label: 'Roboto', className: 'font-roboto' },
        { value: 'Open Sans', label: 'Open Sans', className: 'font-opensans' },
        { value: 'Lato', label: 'Lato', className: 'font-lato' },
        { value: 'Montserrat', label: 'Montserrat', className: 'font-montserrat' },
        { value: 'Poppins', label: 'Poppins', className: 'font-poppins' },
        { value: 'Raleway', label: 'Raleway', className: 'font-raleway' },
        { value: 'Nunito', label: 'Nunito', className: 'font-nunito' },
        { value: 'Playfair Display', label: 'Playfair Display', className: 'font-playfair' },
        { value: 'Source Sans Pro', label: 'Source Sans Pro', className: 'font-sourcesans' },
        { value: 'Merriweather', label: 'Merriweather', className: 'font-merriweather' },
        { value: 'Ubuntu', label: 'Ubuntu', className: 'font-ubuntu' },
        { value: 'Work Sans', label: 'Work Sans', className: 'font-worksans' },
        { value: 'Titillium Web', label: 'Titillium Web', className: 'font-titillium' },
        { value: 'Fira Sans', label: 'Fira Sans', className: 'font-firasans' },
        { value: 'Quicksand', label: 'Quicksand', className: 'font-quicksand' },
        { value: 'Josefin Sans', label: 'Josefin Sans', className: 'font-josefin' },
        { value: 'Kanit', label: 'Kanit', className: 'font-kanit' },
        { value: 'Hind', label: 'Hind', className: 'font-hind' },
        { value: 'Inter', label: 'Inter', className: 'font-inter' },
        { value: 'Barlow', label: 'Barlow', className: 'font-barlow' },
        { value: 'PT Sans', label: 'PT Sans', className: 'font-ptsans' },
        { value: 'Oswald', label: 'Oswald', className: 'font-oswald' },
        { value: 'Manrope', label: 'Manrope', className: 'font-manrope' },
        { value: 'IBM Plex Sans', label: 'IBM Plex Sans', className: 'font-ibmplex' },
        { value: 'Assistant', label: 'Assistant', className: 'font-assistant' },
        { value: 'Signika', label: 'Signika', className: 'font-signika' },
        { value: 'Cabin', label: 'Cabin', className: 'font-cabin' },
        { value: 'Arimo', label: 'Arimo', className: 'font-arimo' },
        { value: 'Exo', label: 'Exo', className: 'font-exo' },
        // Arabic Fonts
        { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic - مرحباً', className: 'font-noto-naskh' },
        { value: 'Noto Sans Arabic', label: 'Noto Sans Arabic - مرحباً', className: 'font-noto-sans' },
        { value: 'Noto Kufi Arabic', label: 'Noto Kufi Arabic - مرحباً', className: 'font-noto-kufi' },
        { value: 'Cairo', label: 'Cairo - مرحباً', className: 'font-cairo' },
        { value: 'Tajawal', label: 'Tajawal - مرحباً', className: 'font-tajawal' },
        { value: 'Almarai', label: 'Almarai - مرحباً', className: 'font-almarai' },
        { value: 'Harmattan', label: 'Harmattan - مرحباً', className: 'font-harmattan' },
        { value: 'Reem Kufi', label: 'Reem Kufi - مرحباً', className: 'font-reem-kufi' },
        { value: 'Amiri', label: 'Amiri - مرحباً', className: 'font-amiri' },
        { value: 'Scheherazade New', label: 'Scheherazade New - مرحباً', className: 'font-scheherazade' }
    ];

    // Combine default fonts with custom fonts
    const allFonts = [...fonts, ...customFonts];

    return (
        <div className="relative bg-[#fff]" ref={dropdownRef}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={handleFontUpload}
                className="hidden"
            />
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-2 px-2 text-left bg-white border border-[#000] rounded flex justify-between items-center"
            >
                <span className={allFonts.find(f => f.value === value)?.className}>
                    {allFonts.find(f => f.value === value)?.label || 'Select a font'}
                </span>
                <span className="ml-2">▼</span>
            </button>
            
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#fff] border border-[#000] rounded shadow-lg max-h-[300px] overflow-y-auto">
                    {/* Upload font button */}
                    <div
                        className="py-2 px-2 cursor-pointer hover:bg-[#dcdbdb] duration-75 ease-in-out border-b border-gray-200 font-semibold text-blue-600"
                        onClick={() => {
                            fileInputRef.current.click();
                            setIsOpen(false);
                        }}
                    >
                        📁 Upload Custom Font
                    </div>
                    
                    {/* Default fonts */}
                    {fonts.map((font) => (
                        <div
                            key={font.value}
                            className={`py-2 px-2 cursor-pointer hover:bg-[#dcdbdb] duration-75 ease-in-out`}
                            style={{fontFamily: font.value}}
                            onClick={() => {
                                onChange(font.value);
                                setIsOpen(false);
                            }}
                        >
                            {font.label}
                        </div>
                    ))}
                    
                    {/* Custom fonts section */}
                    {customFonts.length > 0 && (
                        <>
                            <div className="py-1 px-2 text-xs text-gray-500 border-t border-gray-200 bg-gray-50">
                                Custom Fonts
                            </div>
                            {customFonts.map((font) => (
                                <div
                                    key={font.value}
                                    className={`py-2 px-2 cursor-pointer hover:bg-[#dcdbdb] duration-75 ease-in-out flex justify-between items-center group`}
                                    style={{fontFamily: font.fontFamily}}
                                    onClick={() => {
                                        onChange(font.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span>{font.label}</span>
                                    <button
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeCustomFont(font);
                                        }}
                                        title="Remove font"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
} 