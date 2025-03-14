import { useState, useRef, useEffect } from 'react';

export default function FontDropdown({ onChange, value }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const fonts = [
        // Latin Fonts
        { value: 'Gentium Book Plus', label: 'Gentium Book Plus', className: 'font-gentium' },
        { value: 'Finlandica', label: 'Finlandica', className: 'font-finlandica' },
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

    return (
        <div className="relative bg-[#fff]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-2 px-2 text-left bg-white border border-[#000] rounded flex justify-between items-center"
            >
                <span className={fonts.find(f => f.value === value)?.className}>
                    {fonts.find(f => f.value === value)?.label || 'Select a font'}
                </span>
                <span className="ml-2">▼</span>
            </button>
            
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#fff] border border-[#000] rounded shadow-lg max-h-[300px] overflow-y-auto">
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
                </div>
            )}
        </div>
    );
} 