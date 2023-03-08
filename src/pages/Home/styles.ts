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

export const BaseCountDownButton = styled.button`
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

    z-index: -2;
  }
  &:not(:disabled):hover {
    ::after {
      height: 100%;
    }
  }
`;

export const StartCountDownButton = styled(BaseCountDownButton)`
  ::before {
    background: ${({ theme }) => theme['green-500']};
  }

  ::after {
    background: ${({ theme }) => theme['green-700']};
  }
`;
export const StopCountDownButton = styled(BaseCountDownButton)`
  ::before {
    background: ${({ theme }) => theme['red-500']};
  }

  ::after {
    background: ${({ theme }) => theme['red-700']};
  }
`;
