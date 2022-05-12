import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@atoms/button";
import Chip from "@atoms/chip";
import SelectDate from "@organisms/scheduleForm/selectDate";
import SelectDestination from "@organisms/scheduleForm/selectDestination";
import AddParty from "@organisms/scheduleForm/addParty";

import { FlexDiv } from "@src/styles";

import { Container, ChipWrapper, FormWrapper } from "./styles";

const NewSchedule = () => {
  const navigate = useNavigate();
  const [countChip, setCountChip] = useState(0);

  const handlePast = () => setCountChip(Math.max(0, countChip - 1));
  const handleNext = () => setCountChip(Math.min(2, countChip + 1));
  const goNextPage = () => navigate("/liveSchedule");
  return (
    <Container direction="column">
      <h2>새 여행 생성</h2>
      <ChipWrapper>
        {["일정 선택", "여행지 선택", "일행 추가"].map((content, num) => (
          <Chip key={num} {...{ content, num, status: countChip === num }} />
        ))}
      </ChipWrapper>
      <FormWrapper>
        {countChip === 0 && <SelectDate />}
        {countChip === 1 && <SelectDestination />}
        {countChip === 2 && <AddParty />}
      </FormWrapper>
      <FlexDiv direction="row">
        {countChip !== 0 && <Button onClick={handlePast}>이전</Button>}
        {countChip == 2 ? (
          <Button onClick={goNextPage}>생성</Button>
        ) : (
          <Button onClick={handleNext}>다음</Button>
        )}
      </FlexDiv>
    </Container>
  );
};

export default NewSchedule;
