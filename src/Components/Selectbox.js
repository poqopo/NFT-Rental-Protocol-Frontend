import styled from "styled-components";


const SelectBoxWrapper = styled.div`
	display: flex;
	padding-left : 10px;
`;

export const Select = styled.select`
	display: flex;
	width: 100%;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 12px;
	color: inherit;
	background-color: transparent;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	&:focus {
		border-color: red;
	}
`;
const IconSVG = styled.svg`
	margin-left: -28px;
	align-self: center;
	width: 24px;
	height: 24px;
`;

const SelectBox = (props) => {
	return (
		<SelectBoxWrapper>
			<Select onChange={props.handlechange}>
				{props.options.map((option, index) => (
					<option
						key={index}
						value={option.value}
						defaultValue={props.defaultValue === option.value}
					>
						{option.name}
					</option>
				))}
			</Select>
			<IconSVG
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10 14L16 6H4L10 14Z"
					fill="#1A1A1A"
				/>
			</IconSVG>
		</SelectBoxWrapper>
	);
};

export default SelectBox;