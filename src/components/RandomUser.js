import React, {useEffect, useState} from 'react';

const RandomUser = () => {
    const [user, setUser]=useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        fetch("https://api.randomuser.me/")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const userData={
                name:data.results[0].name.first,
                email:data.results[0].email,
                picture:data.results[0].picture.large
            };

            setUser(userData);
            setLoading(false);
        })

    },[]);

    return (
        
        <div>
            {loading?(
            <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_800,h_600/https://codigofuente.io/wp-content/uploads/2018/09/progress.gif" alt="" />):null}
            {user?(
            <div>
           <p>{user.name}</p>
           <img src={user.picture} alt="" />
           <p>{user.email}</p>
           </div>
           ) : null
            }
        
        </div>
    );
};

export default RandomUser;