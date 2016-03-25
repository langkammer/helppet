angular.module('myApp')
	.factory('Foto', function() {

		var image;

		function Foto(img) {

			this.image = img;
			//this.imageData = imageData;
		};

		function getImageData(img) {

			var canvas = document.createElement('canvas'),
				context;

			canvas.width = img.width;
			canvas.height = img.height;
			context = canvas.getContext('2d');

			context.drawImage(img, 0, 0, img.width, img.height);

			return canvas.toDataURL('image/jpeg');
		};

		Foto.prototype = {

			thumb: function(thumbWidth, thumbHeight) {

	            var scaleWidth = thumbWidth / this.image.width,
	            	scaleHeight = thumbHeight / this.image.height,
	            	canvas = document.createElement('canvas'),
	            	context;

	            canvas.width = this.image.width * scaleWidth;
	            canvas.height = this.image.height * scaleHeight;
	            context = canvas.getContext('2d');

	            context.drawImage(this.image, 0, 0, this.image.width * scaleWidth, this.image.height * scaleHeight);

	            return canvas.toDataURL('image/jpeg');
			},

			asFile: function() {

			   // convert base64/URLEncoded data component to raw binary data held in a string
			    var dataurl = getImageData(this.image);

			    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			    while(n--){
			        u8arr[n] = bstr.charCodeAt(n);
			    }
			    return new Blob([u8arr], {type:mime});
			}
		};

		return (Foto);
	});
