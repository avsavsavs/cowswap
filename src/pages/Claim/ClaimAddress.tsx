import { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { ButtonSecondary } from 'legacy/components/Button'
import Circle from 'legacy/assets/images/blue-loader.svg'
import { CustomLightSpinner, ThemedText } from 'legacy/theme'
import { CheckAddress, InputField, InputFieldTitle, InputErrorText } from './styled'
import { ClaimCommonTypes } from './types'
import useENS from 'legacy/hooks/useENS'
import { useClaimDispatchers, useClaimState } from 'legacy/state/claim/hooks'
import { ClaimStatus } from 'legacy/state/claim/actions'

export type ClaimAddressProps = Pick<ClaimCommonTypes, 'account'> & {
  toggleWalletModal: () => void
}

export default function ClaimAddress({ account, toggleWalletModal }: ClaimAddressProps) {
  const { activeClaimAccount, claimStatus, inputAddress } = useClaimState()
  const { setInputAddress } = useClaimDispatchers()

  const { loading, address: resolvedAddress } = useENS(inputAddress)

  // Show input error
  const showInputError = useMemo(
    () => Boolean(inputAddress.length > 0 && !loading && !resolvedAddress),
    [resolvedAddress, inputAddress, loading]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const withoutSpaces = input.replace(/\s+/g, '')

    setInputAddress(withoutSpaces)
  }

  // const buttonLabel =
  // error instanceof UnsupportedChainIdError ? 'or connect a wallet in a supported network' : 'or connect a wallet'

  if (activeClaimAccount || claimStatus === ClaimStatus.CONFIRMED) return null

  return (
    <CheckAddress>
      <p>
        Enter an address to check for any eligible vCOW claims. <br />
        <i>Note: It is possible to claim for an account, using any wallet/account.</i>
      </p>

      <InputField>
        <InputFieldTitle>
          <b>Input address</b>
          {loading && <CustomLightSpinner src={Circle} alt="loader" size={'10px'} />}
        </InputFieldTitle>
        <input placeholder="Address or ENS name" value={inputAddress} onChange={handleInputChange} />
      </InputField>

      {showInputError && (
        <InputErrorText>
          <ThemedText.Error error={true}>
            <Trans>Enter valid address or ENS</Trans>
          </ThemedText.Error>
        </InputErrorText>
      )}

      {!account && <ButtonSecondary onClick={toggleWalletModal}>{/* <Trans>{buttonLabel}</Trans> */}</ButtonSecondary>}
    </CheckAddress>
  )
}
