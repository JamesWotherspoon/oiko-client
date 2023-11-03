import { useNavigate } from 'react-router-dom';

export const useNavigateBack = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    const { referrer } = document;
    const isSameDomain = referrer && referrer.includes(window.location.origin);

    if (isSameDomain) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };
  return navigateBack;
};
