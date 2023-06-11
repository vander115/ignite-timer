import styled from 'styled-components';

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
