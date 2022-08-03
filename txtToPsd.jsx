

//read text file
var filePath = prompt(
  "Processing \nAdd File Path?",
  "/Users/mubarmj/Desktop/Temp/CourtName.txt",
);
var textFile = new File(filePath);
textFile.encoding = "UTF8";
textFile.open("r");
var fileContentsString = textFile.read();
textFile.close();
// alert(
    //   "File content:" +
    //     fileContentsString + "\r\n" + "fileContentsString length:" +
    //     fileContentsString.length,
    // );
//Split String to lines array
var lines = fileContentsString.split("\n");
//Get Current Active PSD File
current_document = app.activeDocument;
var txtLineNo = 0;
// Get All Layers
var layers = app.activeDocument.layers;
// Search for Text Layer
for (var i = 0; i < layers.length; i++) {
  if (layers[i].kind == "LayerKind.TEXT") {
    txtLineNo = i;
  }
}
var tmp = app.preferences.rulerUnits;
app.preferences.rulerUnits = tmp;
// Get Destination Folder
var pth = prompt(
  "Processing \nNew PSD Destination Path?",
  "/Users/mubarmj/Desktop/Temp/new",
);
var j = 0;
var sliceNo ='';
var fileName = '';
var re = /\s/;
var filePathName= '';
// Loop through lines array and write to text layer and save as PSD
for (j = 0; j < lines.length; j++) {
  if (lines[j].length > 3) {
    layers[txtLineNo].textItem.contents = lines[j];
    app.preferences.rulerUnits = Units.MM;
    //Making file name from line
    sliceNo = lines[j].length > 30 ? 30 : lines[j].length;
    fileName = lines[j].slice(0, sliceNo);
    fileName = fileName.replace(re, "_");
    fileName = fileName.replace(/[&\/\\#,+()$~%.'":*?<>{}@!^]/g,  '');
    
    //Making file path
    filePathName = pth + "/" + j + " " + fileName + ".psd";
    
    const saveFile = new File(filePathName);

    // SavePSD(saveFile);
    //Preparing Options to Save PSD
    psdSaveOptions = new PhotoshopSaveOptions();

    psdSaveOptions.embedColorProfile = true;

    psdSaveOptions.alphaChannels = true;

    psdSaveOptions.layers = true;

    psdSaveOptions.annotations = true;

    psdSaveOptions.spotColors = true;
    //Saving PSD
    app.activeDocument.saveAs(
      saveFile,
      psdSaveOptions,
      true,
      Extension.LOWERCASE,
    );
  }
}

alert("Done! \n" + j + " PSD files created.");

// function SavePSD(saveFile) {
//     psdSaveOptions = new PhotoshopSaveOptions();

//     psdSaveOptions.embedColorProfile = true;

//     psdSaveOptions.alphaChannels = true;

//     psdSaveOptions.layers = true;

//     psdSaveOptions.annotations = true;

//     psdSaveOptions.spotColors = true;

//     app.activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);
// }
