function getImageData( src, cb ){
    let img = document.createElement( 'img' );
    img.src = src;
    img.addEventListener( 'load', e => {
        let canvas = document.createElement( 'canvas' );
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext( '2d' );
        ctx.drawImage( img, 0, 0, img.width, img.height );
        cb( ctx.getImageData( 0, 0, img.width, img.height ) )
    } );
}