import { useAuth0 } from "@auth0/auth0-react";
import GalleryImage from "../GalleryImage";
import Loading from "../../Loading";
import { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Home = ({ images, setImages, usersStars, setUsersStars, showModal }) => {
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  // const [messages, setMessages] = useState([]);
  const webSocket = useRef(null);

  // useEffect(() => {
  //   webSocket.current = new W3CWebSocket('ws://localhost:3001', 'echo-protocol');
  //     webSocket.current.onmessage = (message) => {
  //       serverMessage.star === 'inc' ? (
  //         setImages((previousState) => {
  //           return previousState.map((image) => {
  //             return image.id !== serverMessage.id
  //             ? image
  //             : { ...image, stars: image.stars + 1 };
  //           })
  //           .sort((a, b) => b.stars - a.stars)
  //         })
  //         ) : (
  //           setImages((previousState) => {
  //             return previousState.map((image) => {
  //               return image.id !== serverMessage.id
  //               ? image
  //               : { ...image, stars: image.stars - 1 };
  //             })
  //             .sort((a, b) => b.stars - a.stars)
  //           }))
  //         setMessages(prev => [...prev, message.data]);
  //     };
  //     return () => webSocket.current.close();
  // }, []);

  useEffect(() => {
    webSocket.current = new W3CWebSocket('ws://the-wall-dan-blake.herokuapp.com', 'echo-protocol');

    webSocket.current.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const tes = JSON.parse(e.data)
        console.log(tes);
        tes.star === 'inc' ? (
          setImages((previousState) => {
            return previousState.map((image) => {
              return image.id !== tes.id
              ? image
              : { ...image, stars: image.stars + 1 };
            })
            .sort((a, b) => b.stars - a.stars)
          })
          ) : (
            setImages((previousState) => {
              return previousState.map((image) => {
                return image.id !== tes.id
                ? image
                : { ...image, stars: image.stars - 1 };
              })
              .sort((a, b) => b.stars - a.stars)
            }))
          } else {console.log('not ready')}
          }
    }, [setImages])
        
  useEffect(() => {
    async function refreshGallery() {
      setIsLoading(true); 
      const response = await fetch('https://the-wall-dan-blake.herokuapp.com/images');
      const data = await response.json();
      setImages(data.payload);
      setIsLoading(false);
    }

    refreshGallery();
  }, [user, setImages]);

  async function star(idOfStarredItem) {
    if (!isAuthenticated) return;

    // This next block toggles whether a user has starred the image with id idOfStarredItem
    if (usersStars.includes(idOfStarredItem)) {
      // Remove the image id from the list of starred image ids on the page (this will grey out the star button)
      setUsersStars(usersStars.filter(star => star !== idOfStarredItem));
      
      // Decrement the image's number of stars by 1 on the page
      // setImages((previousState) => {
      //   return previousState
      //   .map((image) => {
      //     return image.id !== idOfStarredItem
      //     ? image
      //     : { ...image, stars: image.stars - 1 };
      //   })
      //     .sort((a, b) => b.stars - a.stars);
      // });
      
      // Delete the (user_id, image_id) pair from the stars table
      await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // client.send(idOfStarredItem.toString());
      webSocket.current.send(JSON.stringify({
        id: idOfStarredItem,
        star: 'dec'
      }));
    } else { // If the user has not starred this image yet
      // Add the image id to the list of starred image ids on the page (this will make the star button gold)
      setUsersStars([...usersStars, idOfStarredItem]);
      
      // Increment the image's number of stars by 1 on the page
      // setImages((previousState) => {
      //   return previousState
      //   .map((image) => {
      //     return image.id !== idOfStarredItem
      //     ? image
      //     : { ...image, stars: image.stars + 1 };
      //   })
      //   .sort((a, b) => b.stars - a.stars);
      // });

      setTimeout(() => {document.getElementById(idOfStarredItem).scrollIntoView({behavior: 'smooth'})}, 100)
      
      // Insert the (user_id, image_id) pair into the stars table
      await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      webSocket.current.send(JSON.stringify({
        id: idOfStarredItem,
        star: 'inc'
      }));
    }
  }

  return (
    <div className="Gallery">
      {isLoading ? (
        <Loading />
      ) : (
        images.map((image, index) => <GalleryImage image={image} star={star} usersStars={usersStars} key={[image.id, index]} showModal={showModal} setUsersStars={setUsersStars} />)
      )}
    </div>
  );
};

export default Home;