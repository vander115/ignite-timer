import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  flex-wrap: wrap;
`;

export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StartCountDownButton = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 1rem;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  z-index: 10;
  overflow: hidden;
  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  ::before {
    content: '';
    position: absolute;
    border-radius: inherit;
    height: 100%;
    width: 100%;
    inset: 0;
    background: ${({ theme }) => theme['green-500']};
    z-index: -2;
  }
  ::after {
    transition: all 0.3s ease;
    content: '';
    position: absolute;
    border-radius: inherit;
    height: 0;
    width: 100%;
    bottom: 0;
    background: ${({ theme }) => theme['green-700']};
    z-index: -2;
  }
  &:not(:disabled):hover {
    ::after {
      height: 100%;
    }
  }
`;

export const BaseInput = styled.input`
  height: 2.5rem;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme['gray-100']};

  :focus {
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme['green-500']};
  }

  ::placeholder {
    color: ${({ theme }) => theme['gray-100']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const AmountMinutesInput = styled(BaseInput)`
  width: 4rem;
`;
