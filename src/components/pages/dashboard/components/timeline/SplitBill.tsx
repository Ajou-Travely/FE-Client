import { css } from "@emotion/react";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
import { api } from "@src/app/api";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = ((hash >> (i * 8)) & 155) + 100;
    colour += `00${value.toString(16)}`.slice(-2);
  }
  console.log(colour);
  return colour;
}

const TextAvatar = ({ name }: { name: string }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        color: black;

        width: 40px;
        height: 40px;
        border-radius: 50%;
      `}
      style={{
        background: stringToColor(name),
      }}
    >
      {name.substring(0, 1)}
    </div>
  );
};
const SplitBill = () => {
  const [createCost] = api.useCreateCostMutation();

  const [isExpand, setIsExpand] = useState(false);

  const [amount] = useState(10000);
  const [val, setVal] = useState(10000);

  return (
    <div
      css={css`
        height: 500px;

        display: flex;
        flex-direction: column;
      `}
    >
      <button
      // onClick={() =>
      //   createCost({
      //     travelId: travelId,
      //     title: "test",
      //     content: "",
      //     amountsPerUser: [{}],
      //   })
      // }
      >
        create
      </button>
      <input
        type="range"
        step={1}
        max={amount}
        value={val}
        onChange={(e) => {
          setVal(e.target.value as unknown as number);
        }}
      />
      <input
        type="number"
        value={val}
        onChange={(e) => {
          setVal(e.target.value as unknown as number);
        }}
      />
      <input type="range" step={1} max={amount} />
      <input type="range" step={1} max={amount} />
      <div
        onClick={() => setIsExpand(!isExpand)}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          width: 350px;
          row-gap: 1rem;
          background-color: rgba(255, 255, 255);
          border-radius: 6px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 1rem;
            `}
          >
            <TextAvatar name="손진혁" />
            <div>
              <div>CU 우만파크점</div>
              <div>24,000 원</div>
            </div>
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: row;

              > * {
                margin-left: -10px;
                border: 2px solid white;
              }
            `}
          >
            <TextAvatar name="박상혁" />
            <TextAvatar name="차재명" />
            <TextAvatar name="이호용" />
          </div>
          {isExpand ? <BiChevronUp /> : <BiChevronDown />}
        </div>

        {isExpand && (
          <>
            <div
              css={css`
                /* margin: 1rem; */
                box-sizing: border-box;
                border: 0.4px solid black;
                width: 100%;
              `}
            />
            <div
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                row-gap: 1rem;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  div {
                    align-items: center;
                    display: flex;
                    gap: 1rem;
                  }
                `}
              >
                <div>
                  <p>결제자</p>
                  <TextAvatar name="박상혁" />
                </div>
                <div>
                  <p>금액</p>
                  <p>24,000 원</p>
                </div>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  row-gap: 1rem;
                `}
              >
                {Array.from({ length: 3 }).map((v) => (
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      width: 100%;
                    `}
                  >
                    <TextAvatar name="박상혁" />
                    <div
                      css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 80%;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          width: 100%;
                          p {
                            margin: 0px;
                          }
                        `}
                      >
                        <p>박상혁</p>
                        <p>6,000원</p>
                      </div>
                      <input type="range" step={1} max={amount} />
                    </div>
                    <BiX />
                  </div>
                ))}
              </div>
              <button>+</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SplitBill;
