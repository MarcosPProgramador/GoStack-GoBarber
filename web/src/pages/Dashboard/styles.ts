import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
`;
export const Header = styled.header`
  height: 144px;
  @media screen and (max-width: 600px) {
    height: 114px;
  }
  padding: 32px 0;
  background-color: ${props => props.theme.colors.medium};
`;
export const Converge = styled.div`
  max-width: 1120px;
  padding: 0 3%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
    @media screen and (max-width: 600px) {
      height: 50px;
    }
  }
  button {
    margin-left: auto;
  }
`;
export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${props => props.theme.colors.text};
    }
    strong {
      color: ${props => props.theme.colors.orange};
      @media screen and (max-width: 350px) {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        max-width: 80px;
        text-overflow: ellipsis;
      }
    }
  }
  @media screen and (max-width: 600px) {
    margin-left: 10px;
    img {
      width: 38px;
      height: 38px;
    }
    div {
      margin-left: 8px;

      span {
        line-height: 15px;
        font-size: 12px;
      }
      strong {
        line-height: 13px;
        font-size: 13px;
      }
    }
  }
`;
export const Content = styled.section`
  padding: 64px 0;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 144px);
  @media screen and (max-width: 600px) {
    height: calc(100vh - 114px);
  }
  > div {
    align-items: unset;
    @media screen and (max-width: 1000px) {
      align-items: center;
      flex-direction: column;
      padding-bottom: 130px;
    }
  }
`;
export const Schedule = styled.aside`
  flex: 1;

  width: 100%;
  margin-right: 120px;
  max-width: 500px;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
  }
  h1 {
    font-size: 36px;
    @media screen and (max-width: 600px) {
      font-size: 26px;
    }
  }
  p {
    display: flex;
    margin-top: 8px;
    color: ${props => props.theme.colors.orange};
    span {
      display: flex;
      align-items: center;
      &:nth-child(n + 2) {
        &::before {
          content: '';
          width: 1px;
          margin: 0 8px;
          height: 10px;
          background-color: ${props => props.theme.colors.orange};
        }
      }
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;
  > h3 {
    color: ${props => props.theme.colors.sub};
    font-size: 20px;
    font-weight: 400;
  }
  > div {
    background-color: ${props => props.theme.colors.shape};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    &::before {
      position: absolute;
      background-color: ${props => props.theme.colors.orange};
      content: '';
      height: 80%;
      width: 2px;

      left: 0;
    }
    > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    > strong {
      margin-left: 20px;
      color: ${props => props.theme.colors.text};
    }
    @media screen and (max-width: 600px) {
      > img {
        width: 40px;
        height: 40px;
      }
      > strong {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    @media screen and (max-width: 350px) {
      > strong {
        white-space: nowrap;
        overflow: hidden;
        max-width: 120px;
        text-overflow: ellipsis;
      }
    }
    > span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: ${props => props.theme.colors.sub};
      > svg {
        margin-right: 5px;
      }
      @media screen and (max-width: 600px) {
        font-size: 10px;
      }
    }
  }
`;
export const Section = styled.section`
  margin-top: 48px;
  > strong {
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;

    color: ${props => props.theme.colors.sub};
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid ${props => props.theme.colors.medium};
  }
`;
export const Appointment = styled.div`
  display: flex;
  &:nth-child(n + 2) {
    margin-bottom: 16px;
  }
  > span {
    margin-right: 26px;
    @media screen and (max-width: 600px) {
      margin-right: 6px;
      font-size: 12px;
    }
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.sub};
    svg {
      margin-right: 5px;
    }
  }
  div {
    padding: 8px 20px;
    border-radius: 10px;
    flex: 1;
    background-color: ${props => props.theme.colors.shape};
    display: flex;
    align-items: center;
    > img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    strong {
      margin-left: 16px;
      @media screen and (max-width: 350px) {
        white-space: nowrap;
        overflow: hidden;
        max-width: 60px;
        text-overflow: ellipsis;
      }
    }
  }
`;
export const Calendar = styled.aside`
  @media screen and (max-width: 1000px) {
    margin-top: 50px;
  }
  width: 100%;
  max-width: 380px;
  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #3e3b47 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
