/**
	 * jQuery Data : Base64 functions
	 * 
	 * 	<code>
	 * 		Encode the string to base64 string
	 * 		String $.base64Encode ( String input )
	 *		<br />
	 * 		Decode the base64 string to string
	 * 		String $.base64Decode ( String input )
	 * 	</code>
	 * 
	 * Encodes and Decodes the given data in base64.
	 * This encoding is designed to make binary data survive transport through transport layers that are not 8-bit clean, such as mail bodies.
	 * Base64-encoded data takes about 33% more space than the original data. 
	 * This javascript code is used to encode / decode data using base64 (this encoding is designed to make binary data survive transport through transport layers that are not 8-bit clean). Script is fully compatible with UTF-8 encoding. You can use base64 encoded data as simple encryption mechanism.
	 * If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
	 * This function orginally get from the webtoolkit.info and rewrite for using as the jQuery plugin.
	 * 
	 * Example
	 * 	Code
	 * 		<code>
	 * 			$.base64Encode("Persian Gulf"); 
	 * 		</code>
	 * 	Result
	 * 		<code>
	 * 			"UGVyc2lhbiBHdWxm"
	 * 		</code>
	 * 	Code
	 * 		<code>
	 * 			$.base64Decode("UGVyc2lhbiBHdWxm");
	 * 		</code>
	 * 	Result
	 * 		<code>
	 * 			"Persian Gulf"
	 * 		</code>
	 * 
	 * @author Muhammad Hussein Fattahizadeh <http://mhf.ir/>
	 * @link https://github.com/mhf-ir/jquery-data/jquey.base64.js
	 * @see http://www.webtoolkit.info/javascript-base64.html
	 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	 * @param {jQuery} {base64Encode:function(input))
	 * @param {jQuery} {base64Decode:function(input))
	 * @return String
	 */
	
	(function($){
		
		jQuery.extend({
			
			/**
			 * Base64 key strings
			 * @access private
			 * @var string
			 */
			_base64KeyStrings : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			
			/**
			 * Encode the string to base64 string
			 * @access public
			 * @param String input
			 * @return String
			 */
			base64Encode : function (input) {
				
				// define variables
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				
				// get unicode based input
				input = this._base64Utf8Encode(input);
				
				// spell all characters
				while (i < input.length) {
					
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					
					if (isNaN(chr2))
						enc3 = enc4 = 64;
					else if (isNaN(chr3))
						enc4 = 64;
					
					output = output + this._base64KeyStrings.charAt(enc1) + this._base64KeyStrings.charAt(enc2) + this._base64KeyStrings.charAt(enc3) + this._base64KeyStrings.charAt(enc4);
				}
				
				// return base64 encoded string
				return output;
			},
			
			/**
			 * Decode the base64 string to string
			 * @access public
			 * @param String input
			 * @return String
			 */
			base64Decode : function (input) {
				
				// define variables
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				
				// check for invalid characters
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				
				// spell all characters
				while (i < input.length) {
					
					enc1 = this._base64KeyStrings.indexOf(input.charAt(i++));
					enc2 = this._base64KeyStrings.indexOf(input.charAt(i++));
					enc3 = this._base64KeyStrings.indexOf(input.charAt(i++));
					enc4 = this._base64KeyStrings.indexOf(input.charAt(i++));
					
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					
					output = output + String.fromCharCode(chr1);
					
					if (enc3 != 64)
						output = output + String.fromCharCode(chr2);
					if (enc4 != 64)
						output = output + String.fromCharCode(chr3);
				}
				
				// set unicode based input
				output = this._base64Utf8Decode(output);
				
				// return base64 decoded string
				return output;
			},
			
			/**
			 * Unicode (UTF-8) encoding
			 * @access private
			 * @param String string
			 * @return String
			 */
			_base64Utf8Encode : function (string) {
				
				// correct line break
				string = string.replace(/\r\n/g,"\n");
				
				// variables
				var utftext = "";
				
				// spell all characters
				for (var n = 0; n < string.length; n++) {
					
					var c = string.charCodeAt(n);
					
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				
				// return unicode text
				return utftext;
			},
			
			/**
			 * Unicode (UTF-8) decoding
			 * @access private
			 * @param String utftext
			 * @return String
			 */
			_base64Utf8Decode : function (utftext) {
				
				// variables
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;
				
				// spell all characters
				while ( i < utftext.length ) {
					
					c = utftext.charCodeAt(i);
					
					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i+1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i+1);
						c3 = utftext.charCodeAt(i+2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				
				// return decoded string
				return string;
			}
		});
		
	})(jQuery);