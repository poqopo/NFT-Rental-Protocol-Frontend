import styled from "styled-components";

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


export default function Menu() {
    return (
        <StyledMenu>
            <div className="item">리스팅/대여</div>
            <div className="item">ID 순서정렬</div>
            <div className="item">담보금 정렬</div>
            <div className="item">대여료 정렬</div>
            <div className="item">최대 대여 기간 정렬</div>
        </StyledMenu>
    )

}