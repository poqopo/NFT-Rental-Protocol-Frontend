import { useParams } from "react-router-dom";
import styled from "styled-components";
import Detail from "../components/Detail";


const StyledItemdetail = styled.div`
  margin: 5% 8%;
  border: 1px solid blue;
  border-radius: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;



function ItemDetail() {
  const params = useParams()
  
  return (
    <StyledItemdetail>
      <Detail />
    </StyledItemdetail>
  );
}

export default ItemDetail;
