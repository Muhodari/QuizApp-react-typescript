import styled,{createGlobalStyle} from "styled-components";
import BGImage  from "./images/ishan-seefromthesky-k6mgXWpzG7k-unsplash.jpg"

export const GlobleStyle = createGlobalStyle`

html{
    width:100%; 
}

body{
    background-image:url(${BGImage});
    background-size:cover;
    margin:0;
    padding:0 20px;
    display:flex;
    justify-content:center;
}

*{
    box-sizing:border-box;
    font-family:'catamaran', sans-serif
}
`