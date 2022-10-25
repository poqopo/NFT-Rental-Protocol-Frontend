import { useState } from "react";
import Modal from "react-modal";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useParams } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "50%",
  },
};

const StyledForm = styled.div`
  width: 80%;
  height: 44px;
  margin: auto;
  display: flex;
`;

export default function EditProfile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState()
  const [nickname, setNickname] = useState()
  const [banner, setBanner] = useState()
  const params = useParams()

  const onImageChange = (e) => setImage(e.target.value)
  const onNicknameChange = (e) => setNickname(e.target.value)
  const onBannerChange = (e) => setBanner(e.target.value)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function modifInfo(type, input) {
    axios.get(process.env.REACT_APP_API_URL + `/user/changeInfo/${params.useraddress}?type=${type}&value=${input}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <AiFillEdit size={"30px"} onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ display: "flex", placeContent: "space-between" }}>
          <h2>프로필 수정</h2>
          <div style={{ cursor: "pointer" }}>
            <AiFillCloseCircle size={"30px"} onClick={closeModal} />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            height: "75%",
          }}
        >
          <StyledForm>
            <Input text={"이미지 URL을 입력해주세요"} onChange={onImageChange} />
            <Button
              text={"Change!"}
              onClick={() => modifInfo("image", image)}
            />
          </StyledForm>
          <StyledForm>
            <Input text={"닉네임을 입력해주세요"} onChange={onNicknameChange}/>
            <Button
              text={"Change!"}
              onClick={() => modifInfo("nickname", nickname)}
            />
          </StyledForm>
          <StyledForm>
            <Input text={"배너 이미지 URL을 입력해주세요"} onChange={onBannerChange}/>
            <Button
              text={"Change!"}
              onClick={() => modifInfo("banner", banner)}
            />
          </StyledForm>
        </div>
      </Modal>
    </div>
  );
}
