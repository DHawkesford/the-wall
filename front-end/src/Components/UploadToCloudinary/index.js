// import { useState } from 'react';

// export default function UploadToCloudinary({ setValue }) {
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState(null);

//   function handleOnChange(event) {
//     const reader = new FileReader();

//     reader.onload = function (onLoadEvent) {
//       setImage(onLoadEvent.target.result);
//     };

//     reader.readAsDataURL(event.target.files[0]);
//   }

//   // Post image to Cloudinary
//   async function handleOnSubmit(event) {
//     event.preventDefault();

//     const response = await fetch(
//       'https://api.cloudinary.com/v1_1/ddmilnqpc/image/upload',
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           file: image,
//           upload_preset: 'gallery',
//         }),
//       }
//     );

//     const data = await response.json();

//     setUrl(data.secure_url);
//     setValue('url', data.secure_url);
//     console.log(data);
//   }

//   return (
//     <div className="form-field">
//         <span>Upload image:</span>
//         <div className="cloudinary-upload" method="post">
//             <input onChange={handleOnChange} type="file" name="file" />
//             <img className="upload-form-image" src={image} />
//             {!url && <button onClick={handleOnSubmit}>Confirm Upload!</button>}
//         </div>
//     </div>
//   );
// }