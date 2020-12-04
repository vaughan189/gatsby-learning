import React, { useState } from 'react';

var BuyButton = React.memo(({post, images}) => {
    const [selected, setSelected] = post.customField 
        ? useState(post.customField.values[0]) 
        : useState({});
    var filteredImgs = images.filter(x => x.name === selected);
    var choosenImgSrc = filteredImgs.length > 0
    ? filteredImgs[0].src
    : images[0].src

    return (
    <div>
        <img src={choosenImgSrc} width="400px" alt={post.title}></img>
        { post.customField && <h3>{post.customField.name}</h3> }
        { post.customField &&
            <select 
                id={post.customField.name} 
                onBlur={(e) => setSelected(e.target.value)} 
                value={selected}
                style={{
                    borderRadius: "5px",
                    paddingRight: "20px",
                    paddingBlockStart: "13px",
                    paddingBlockEnd: "13px",
                    marginRight: "15px"
                }}>
                {post.customField.values.map((x) => (<option key={x}>{x}</option>))}
            </select>
        }
        <button 
        data-item-custom1-name={post.customField ? post.customField.name : null}
        data-item-custom1-value={selected}
        style={{
            backgroundColor: "#212121",
            borderRadius: "5px",
            color: "#F5F5F5",
            fontWeight: "bold",
            paddingBottom: "15px",
            paddingTop: "15px",
            paddingRight: "35px",
            paddingLeft: "35px",
            fontSize: "24"
        }}
        id="buyButton"
        className='snipcart-add-item buyBtn'
        data-item-id={post.id}
        data-item-price={post.price}
        data-item-image={choosenImgSrc}
        data-item-name={post.title}
        data-item-description={post.description}
        data-item-url={"https://snipcart-react-gatsby.netlify.com/" + post.path}>
        Buy for {post.price}$
        </button>
    </div>
    )
})

export default BuyButton;