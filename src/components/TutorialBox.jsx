export default function TutorialBox() {

  return (
    <div className={`w-screen px-9 sm:px-52 `}>
      <div className="bg-scribe-ivory w-full  border-2 border-scribe-brown rounded-lg shadow-lg">
        <div className="bg-scribe-green text-scribe-yellow p-3 rounded-t-md flex justify-between items-center">
          <h3 className="font-book text-lg font-bold">How to Use Scribe</h3>
         
        </div>
        
        <div className="p-4 space-y-3 ">
          <div className="space-y-1">
            <h4 className="font-finlandica font-bold">Step 1: Upload Image</h4>
            <p className="text-sm text-scribe-gray">Upload your invitation template image using the file selector. (only PNGs, JPGs & JPEGs are allowed.)</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-finlandica font-bold">Step 2: Customize Text</h4>
            <p className="text-sm text-scribe-gray">Click on the sample text to edit it. You can change the font, size, and color using the options below the preview.</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-finlandica font-bold">Step 3: Add Names</h4>
            <p className="text-sm text-scribe-gray">Add each recipient's name using the "Add" button. Each name will generate a unique invitation.</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-finlandica font-bold">Step 4: Download</h4>
            <p className="text-sm text-scribe-gray">
              • Download Current: Get only the currently displayed invitation<br />
              • Download All Names: Get a ZIP file with personalized invitations for everyone
            </p>
          </div>
          
          <div className="mt-4 pt-2 border-t border-scribe-brown">
            <p className="text-xs italic text-center text-scribe-gray">Move and resize text by dragging. You can make it perfect for each invitation!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
