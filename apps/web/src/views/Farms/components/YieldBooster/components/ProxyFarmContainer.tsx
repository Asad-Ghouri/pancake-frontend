import _noop from 'lodash/noop'
import { ReactElement, createContext, memo, useMemo } from 'react'
import { Address } from 'viem'

import { FarmWithStakedValue } from '@pancakeswap/farms'
import useYieldBoosterState, { YieldBoosterState } from '../hooks/useYieldBoosterState'

interface ProxyFarmContainerPropsType {
  children: ReactElement
  farm: FarmWithStakedValue
}

export const YieldBoosterStateContext = createContext({
  boosterState: YieldBoosterState.UNCONNECTED,
  refreshActivePool: _noop,
  proxyFarm: {},
  shouldUseProxyFarm: false,
  refreshProxyAddress: _noop,
  proxyAddress: undefined as Address | undefined,
})

const ProxyFarmContainer: React.FC<ProxyFarmContainerPropsType> = ({ children, farm }) => {
  const {
    state: boosterState,
    refreshActivePool,
    shouldUseProxyFarm,
    refreshProxyAddress,
    proxyAddress,
  } = useYieldBoosterState({
    farmPid: farm.pid,
  })

  const proxyFarm = useMemo(
    () => ({
      ...farm,
      userData: farm.userData?.proxy,
    }),
    [farm],
  )

  const providerValue = useMemo(() => {
    return { proxyAddress, boosterState, refreshActivePool, refreshProxyAddress, proxyFarm, shouldUseProxyFarm }
  }, [proxyAddress, boosterState, refreshActivePool, refreshProxyAddress, proxyFarm, shouldUseProxyFarm])

  return <YieldBoosterStateContext.Provider value={providerValue}>{children}</YieldBoosterStateContext.Provider>
}

export default memo(ProxyFarmContainer)