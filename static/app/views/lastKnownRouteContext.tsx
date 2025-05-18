import {createContext, useContext, useEffect, useRef, useState} from 'react';

import {useLocation} from 'sentry/utils/useLocation';

const LastKnownRouteContext = createContext<string>('');

export function LastKnownRouteContextProvider({children}: {children?: React.ReactNode}) {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  const [lastKnownRoute, setLastKnownRoute] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== previousPathRef.current) {
      setLastKnownRoute(previousPathRef.current);
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <LastKnownRouteContext.Provider value={lastKnownRoute}>
      {children}
    </LastKnownRouteContext.Provider>
  );
}

export function useLastKnownRoute() {
  return useContext(LastKnownRouteContext);
}

export default LastKnownRouteContext;
