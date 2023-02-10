import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${({ theme }) => theme['gray-100']};

      font-size: 1.5rem;

      transition: all 0.2s ease;

      ::after {
        transition: all 0.2s ease;

        content: '';
        position: absolute;
        bottom: 0;
        width: 0;
        height: 3px;
        border-radius: 3px;
        background: ${({ theme }) => theme['green-500']};
      }
      :hover {
        ::after {
          width: 90%;
        }
      }
      &.active {
        color: ${({ theme }) => theme['green-500']};
      }
    }
  }
`;
