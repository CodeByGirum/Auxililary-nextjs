
export const downloadSvgAsPng = (svgElement: SVGElement, fileName: string) => {
  try {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    
    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Get dimensions from SVG or use bounding rect
    const rect = svgElement.getBoundingClientRect();
    const width = rect.width * 2; // 2x for Retina/High Res
    const height = rect.height * 2;
    
    canvas.width = width;
    canvas.height = height;
    
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      if (ctx) {
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Download
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
      }
    };
    
    img.src = url;
  } catch (error) {
    console.error('Failed to download image', error);
  }
};
