let img = new Rune.Pixels( '/data/posters.jpg' );
img.load( err => {
    let width = img.width,
        height = img.height;

    const r = new Rune( {
        container: "body",
        width: width,
        height: height
    } );

    r.rect( 0, 0, width, height )
        .fill( 0 );
    
    let noise = new Rune.Noise();

    /*let gridSize  = 5;
    for( let y = 0; y < height; y += gridSize ) {
        for( let x = 0; x < width; x += gridSize ) {
            let color = img.get( x, y );
            // if( noise.get( x/100, y/100 ) > 0.5) {
            if( color.luminosity() > 0.5) {
                r.line( x, y, x + gridSize, y + gridSize )
                    .stroke( 255 );
            }
            else {
                r.line( x + gridSize, y, x, y + gridSize )
                    .stroke( 255 );
            }
        }
    }*/

    let cx = width/2;
    let cy = height/2;
    let path = r.path( 0, 0 );
    path.moveTo( cx, cy );
    path.fill( false );
    path.stroke( 255 );
    for( let i = 0; i < 55000; i ++ ) {
        let angle =  i * 0.01;
        let r = i * 0.005;
        let x = cx + Math.sin( angle ) * r;
        let y = cy + Math.cos( angle ) * r;

        if( img.get( x, y ).luminosity() > 0.5 ){
            r += 5;
            x = cx + Math.sin( angle ) * r;
            y = cy + Math.cos( angle ) * r;
        }

        path.lineTo( x, y );
    }


    
    r.draw();
    save();
} );

function save(){
    //get svg element.
    var svg = document.querySelector( "svg" );

    //get svg source.
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    //add name spaces.
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    //convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

    //set url value to a element's href attribute.
    document.getElementById("link").href = url;
    //you can download svg file by right click menu.
};

