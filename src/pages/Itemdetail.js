import { useParams } from "react-router-dom";
import styled from "styled-components";
import Detail from "../components/Detail";


const StyledItemdetail = styled.div`
  margin: 5% 8%;
  border: 1px solid #FF8826;
  border-radius: 30px;
  margin-top: 5%;
`;



function ItemDetail() {
  const params = useParams()
  
  return (
    <StyledItemdetail>
      <Detail type={params.detail} contract_address={params.contractaddress} token_id={params.tokenid}/>
    </StyledItemdetail>
  );
}

export default ItemDetail;
