getImageData( 'data/Capture.PNG', data => {
    let width = data.width,
        height = data.height,
        pixels = data.data;

    const r = new Rune( {
        container: "body",
        width: width,
        height: height
    } );

    r.rect( 0, 0, width, height )
        .fill( 0 );
    
    let gridSize  = 5;
    for( let y = 0; y < height; y += gridSize ) {
        for( let x = 0; x < width; x += gridSize ) {
            let index = ( y * width + x ) * 4;
            let color = new Rune.Color( pixels[ index ], pixels[ index + 1 ], pixels[ index + 2 ] );
            if( color.luminosity() > .1 ) {
                r.line( x, y, x + gridSize, y + gridSize )
                    .stroke( 255 );
            }
            else {
                r.line( x + gridSize, y, x, y + gridSize )
                    .stroke( 255 );
            }
        }
    }
    
    r.draw();
} );