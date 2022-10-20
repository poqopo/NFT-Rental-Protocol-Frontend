import styled from "styled-components";
import Button from "./Button";

const StyledMenu = styled.div`
    width : 90%;
    height : 50px;
    margin :  40px auto;
    display : grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap : 20px;
    text-align : center;
    place-content : center;

    & .item {
        text-align: center;
        border-radius: 12px;
        padding :  20px 0px;
        color: rgb(255, 255, 255);
        background-color: rgba(43, 45, 55, 0.6);
        word-break: break-word;
    }
`


export default function Menu(props) {
    return (
        <StyledMenu>
            {props.menu?.map((data, index) => {
                <Button className="item" text={data.text} onClick={props.onClick1}/>
            })}
        </StyledMenu>
    )

}