import ScribeButton from "./ScribeButton"
import * as fabric from 'fabric'
import { useEffect, useRef, useState, useCallback } from "react"
import FontDropdown from './FontDropdown'
import JSZip from 'jszip'

export default function PreviewSection({uploadedFile, handleFileSelect}){
    const canvasRef = useRef(null)
    const fabricRef = useRef(null);
    const [fontSize, setFontSize] = useState(40)
    const [names, setNames] = useState([])
    const [color, setColor] = useState("#000")
    const [font, setFont] = useState("Arial")
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 400, height: 400 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentName, setCurrentName] = useState("Sample Text")
    const debounceTimer = useRef(null);
    const colorsAll = [
        "#000000", // Black
        "#7F7F7F", // Dark Gray
        "#D9D9D9", // Light Gray
        "#FFFFFF", // White
        "#FF0000", // Red
        "#C00000", // Dark Red
        "#F4B084", // Light Orange
        "#FFC000", // Orange
        "#FFD966", // Light Yellow
        "#FFFF00", // Yellow
        "#C6E0B4", // Light Green
        "#92D050", // Green
        "#00B050", // Dark Green
        "#00B0F0", // Light Blue
        "#9BC2E6", // Sky Blue
        "#0070C0", // Blue
        "#002060", // Dark Blue
        "#7030A0", // Purple
        "#B4A7D6", // Light Purple
        "#EAD1DC", // Light Pink
        "#FF99CC", // Pink
        "#FF6600", // Deep Orange
        "#339966", // Teal
        "#6600CC", // Violet
        "#993300", // Brown
      ];
    
    // Debounced function to update text
    const debouncedUpdateText = useCallback((text) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        
        debounceTimer.current = setTimeout(() => {
            if (fabricRef.current) {
                const textbox = fabricRef.current.getObjects().find(obj => obj.type === 'textbox');
                if (textbox) {
                    textbox.set('text', text);
                    fabricRef.current.renderAll();
                }
            }
        }, 100); // 100ms debounce
    }, []);

    // Initialize the canvas only once when component mounts
    useEffect(() => {
        if (canvasRef.current && !fabricRef.current) {
            console.log("Initializing canvas");
            fabricRef.current = new fabric.Canvas(canvasRef.current, {
                width: canvasDimensions.width,
                height: canvasDimensions.height,
                backgroundColor: "#D0D0D0",
                renderOnAddRemove: false // Disable automatic rendering
            });
        }
        
        return () => {
            if (fabricRef.current) {
                console.log("Disposing canvas");
                fabricRef.current.dispose();
                fabricRef.current = null;
            }
        };
    }, []);
    
    // Resize canvas when dimensions change
    useEffect(() => {
        if (fabricRef.current) {
            console.log("Resizing canvas to:", canvasDimensions);
            fabricRef.current.setWidth(canvasDimensions.width);
            fabricRef.current.setHeight(canvasDimensions.height);
            
            // Add a textbox if it doesn't exist yet
            const existingTextboxes = fabricRef.current.getObjects().filter(obj => obj.type === 'textbox');
            if (existingTextboxes.length === 0) {
                const textbox = new fabric.Textbox('Sample Text', {
                    left: canvasDimensions.width / 2 - 100,
                    top: canvasDimensions.height / 2,
                    width: 200,
                    fontSize: fontSize,
                    fill: color,
                    backgroundColor: 'transparent',
                    fontFamily: font,
                    textAlign: 'center',
                    transparentCorners: false,
                    editable: true,
                    lockUniScaling: true,
                    centerTransform: true,
                    snapAngle: 45,
                    padding: 10,
                    hasControls: true,
                    hasBorders: true
                });
                
                textbox.on({
                    'rotating': function() {
                        fabricRef.current.renderAll();
                    },
                    'scaling': function() {
                        fabricRef.current.renderAll();
                    }
                });
                
                fabricRef.current.add(textbox);
            }
            
            fabricRef.current.renderAll();
        }
    }, [canvasDimensions]);
    
    // Handle file upload using two-step approach
    useEffect(() => {
        if (!uploadedFile || !fabricRef.current) return;
        
        console.log("Processing uploaded file:", uploadedFile.name);
        
        // Step 1: Load the image using the browser's Image API first
        const img = new Image();
        const fileUrl = URL.createObjectURL(uploadedFile);
        
        img.onload = function() {
            console.log("Browser image loaded:", img.width, "x", img.height);
            
            // Calculate half size while maintaining aspect ratio
            const maxWidth = img.width;
            const maxHeight = img.height;
            setImageLoaded(true)
            // Update canvas dimensions to match image
            setCanvasDimensions({
                width: maxWidth,
                height: maxHeight
            });
            
            try {
                // Step 2: Create a Fabric image object
                const fabricImg = new fabric.FabricImage(img, {
                    left: 0,
                    top: 0,
                    scaleX: maxWidth / img.width,
                    scaleY: maxHeight / img.height,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,  // Make image non-selectable
                    evented: false      // Prevent all events on the image
                });
                
                // Clear canvas
                fabricRef.current.clear();
                
                // Add the image as a regular object first
                fabricRef.current.add(fabricImg);
                
                // Send it to back so text stays on top
                fabricImg.sendToBack();
                
                console.log("Image added to canvas");
                setImageLoaded(true);
                fabricRef.current.renderAll();
                
            } catch (error) {
                console.error("Error creating Fabric image:", error);
                
                // Fallback: Try an alternative approach
                try {
                    fabric.Image.fromURL(fileUrl, function(fabricImg) {
                        fabricRef.current.clear();
                        fabricRef.current.add(fabricImg);
                        fabricImg.set({
                            selectable: false,
                            evented: false,
                            scaleX: maxWidth / img.width,
                            scaleY: maxHeight / img.height
                        });
                        fabricImg.scaleToWidth(maxWidth);
                        fabricImg.scaleToHeight(maxHeight);
                        fabricImg.sendToBack();
                        fabricRef.current.renderAll();
                        console.log("Image added using fallback method");
                        setImageLoaded(true);
                    });
                } catch (fallbackError) {
                    console.error("Fallback also failed:", fallbackError);
                }
            }
        };
        
        img.onerror = function() {
            console.error("Failed to load image");
        };
        
        img.src = fileUrl;
        
        return () => {
            URL.revokeObjectURL(fileUrl);
        };
    }, [uploadedFile]);
    
    // Add this useEffect to handle font size changes
    useEffect(() => {
        if (fabricRef.current) {
            const textbox = fabricRef.current.getObjects().find(obj => obj.type === 'textbox');
            if (textbox) {
                textbox.set('fontSize', parseInt(fontSize));
                fabricRef.current.renderAll();
            }
        }
    }, [fontSize]);

    const handleNameAdd = (e) => {
        setNames([...names, currentName])
    }

    const handleNameDelete = (nameToDelete) => {
        setNames(names.filter(name => name !== nameToDelete));
    };
    

    useEffect(()=>{    
        if (fabricRef.current) {
            const textbox = fabricRef.current.getObjects().find(obj => obj.type === 'textbox');
            if (textbox) {
                textbox.set('fill', color);
                fabricRef.current.renderAll();
            }
        }
    }, [color])

    useEffect(()=>{    
        if (fabricRef.current) {
            const textbox = fabricRef.current.getObjects().find(obj => obj.type === 'textbox');
            if (textbox) {
                textbox.set('fontFamily', font);
                fabricRef.current.renderAll();
            }
        }
    }, [font])
    
    // Add this function inside your component
    const handleDownload = () => {
        if (!fabricRef.current) return;

        // Convert canvas to data URL and trigger download
        const dataURL = fabricRef.current.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 1
        });

        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.download = `invitation-${Date.now()}.png`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Add this new function inside the PreviewSection component
    const handleDownloadAll = async () => {
        if (!fabricRef.current || names.length === 0) return;

        const zip = new JSZip();
        
        // Create a folder in the zip for the images
        const imagesFolder = zip.folder("invitations");

        // Create a promise array for all image generations
        const imagePromises = names.map(async (name) => {
            // Find the textbox
            const textbox = fabricRef.current.getObjects().find(obj => obj.type === 'textbox');
            if (!textbox) return;

            // Store original text
            const originalText = textbox.text;

            // Update text to current name
            textbox.set('text', name);
            fabricRef.current.renderAll();

            // Generate data URL for this name
            const dataURL = fabricRef.current.toDataURL({
                format: 'png',
                quality: 1,
                multiplier: 1
            });

            // Add to zip
            imagesFolder.file(`${name}.png`, dataURL.split(',')[1], {base64: true});

            // Restore original text
            textbox.set('text', originalText);
            fabricRef.current.renderAll();
        });

        // Wait for all images to be generated
        await Promise.all(imagePromises);

        // Generate and download the zip file
        const content = await zip.generateAsync({type: "blob"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `invitations-${Date.now()}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getScaleFactor = () => {
        if (canvasDimensions.width === 0 || canvasDimensions.height === 0) return 0.5;
        
        const displayWidth = window.innerWidth > 640 ? 400 : 300; // Adjust based on screen size
        return Math.min(displayWidth / canvasDimensions.width, 0.5); // Cap at 0.5 scale
    };

    return (
        <div className="flex flex-col my-[18rem]">
            <div className="bg-scribe-ivory w-full max-w-[70rem] flex-1 rounded-xl my-10 pb-10 mx-auto">
                <h1 className="font-book text-2xl md:text-4xl px-2 py-3 font-bold">Preview</h1>

                <div className="flex justify-center">
                    {imageLoaded === true ? (
                        <p></p>
                    ) : uploadedFile ? (
                        <p className="text-orange-600 mb-2">Loading image...</p>
                    ) : null}
                </div>
                
                {/* Canvas Area */}
                <div className="flex justify-center items-center">
                    <div className="relative" style={{
                        width: canvasDimensions.width * getScaleFactor(), 
                        height: canvasDimensions.height * getScaleFactor(),
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            transform: `scale(${getScaleFactor()})`,
                            transformOrigin: 'top left',
                            width: canvasDimensions.width,
                            height: canvasDimensions.height
                        }}>
                            <canvas 
                                ref={canvasRef} 
                                style={{ 
                                    border: '1px solid #ccc',
                                    width: canvasDimensions.width,
                                    height: canvasDimensions.height
                                }}
                            />
                        </div>
                    </div>
                </div>
                    {uploadedFile && (
                        <p className='font-finlandica text-scribe-gray mt-2 text-center break-all'>
                            {uploadedFile.name}
                        </p>
                    )}
                    

                <div className="flex justify-center mt-4 space-x-2 md:space-x-4 px-4 flex-wrap gap-y-2">
                    <ScribeButton 
                        title="Download Current" 
                        color="green" 
                        fun={handleDownload}
                    />
                    <ScribeButton 
                        title="Download All Names" 
                        color="brown" 
                        fun={handleDownloadAll}
                    />
                </div>

            {/* Reupload area */}
                <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col my-[2rem] px-4'>
                    <div className='bg-scribe-ivory space-y-5 rounded flex flex-col'>
                        <p className='text-scribe-gray font-book font-bold text-2xl md:text-4xl'>Reupload Your Image</p>
                        <div className='flex space-x-2'>
                            <input 
                                type='file' 
                                accept='.png,.jpg,.jpeg' 
                                onChange={handleFileSelect} 
                                required  
                                className={`file:font-book file:border-0 file:bg-scribe-brown file:font-bold file:text-scribe-yellow file:w-full md:file:w-[8rem] file:rounded file:h-[4rem] file:transition-all file:duration-50 file:active:shadow-none file:cursor-pointer file:mr-4 w-full`}
                            />
      </div>
      </div>
                </form>

        {/* Customize area */}
                <div className="px-4 py-3 space-y-2">
                    <h1 className="font-book text-2xl md:text-4xl font-bold">Customize</h1>

                    <p className="font-finlandica font-bold text-lg md:text-xl">Names</p>
                    <div className="flex w-full">
                        <input 
                            type="text" 
                            placeholder="Add a name" 
                            className="w-full py-2 rounded-l px-2 rounded-r-none border-[#000] border"
                            onChange={(e) => {
                                setCurrentName(e.target.value);
                                debouncedUpdateText(e.target.value);
                            }}
                        />
                        <button className="w-[4rem] bg-scribe-green text-scribe-ivory rounded-r" onClick={handleNameAdd}>Add</button>
                    </div>

                    <div className="max-h-[200px] overflow-y-auto">
                        {names.map((name, key)=>(
                            <div key={key} className="px-2 py-2 border rounded relative bg-[#e6e6e6] mb-2">
                                <span className="break-all pr-8">{name}</span>
                                <button 
                                    onClick={()=>handleNameDelete(name)} 
                                    className="text-[#fa2020] font-finlandica font-bold absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    X
                                </button>
                            </div>
                        ))}
      </div>

                    <p className="font-finlandica font-bold text-lg md:text-xl">Fonts</p>
                    <FontDropdown 
                        onChange={(value) => {
                            setFont(value)
                        }}
                        value={font}
                    />

                    <label>
                        <p className="font-finlandica font-bold text-lg md:text-xl mt-2">Font Size</p>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="range" 
                                min="10"
                                max="200"
                                value={fontSize} 
                                onChange={(e)=>setFontSize(e.target.value)} 
                                className="flex-grow"
                            />
                            <span className="min-w-[4rem]">{fontSize}px</span>
                        </div>
                    </label>

                    <p className="font-finlandica font-bold text-lg md:text-xl">Text Color</p>
                    <div className="flex flex-wrap gap-1">
                        {colorsAll.map((col, key)=>(
                            <button 
                                className="w-8 h-8 border-[#000] border rounded-sm hover:scale-110 transition-transform" 
                                style={{backgroundColor: col}} 
                                key={key} 
                                onClick={()=>setColor(col)}
                            />
                        ))}
                    </div>
                </div>
        </div>
        </div>
    )
}