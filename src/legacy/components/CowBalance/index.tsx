import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { ClaimSummaryTitle, ClaimTotal, ClaimSummary as ClaimSummaryWrapper } from 'pages/Claim/styled'
import CowProtocolLogo from 'legacy/components/CowProtocolLogo'
import { CowSubsidyInfoProps } from 'legacy/components/CowSubsidyModal'
import { TokenAmount } from 'common/pure/TokenAmount'

const Wrapper = styled(ClaimSummaryWrapper)`
  border-radius: 100px;
  margin: 0;

  ${ClaimTotal} {
    > b {
      margin: 0 0 4px;
    }

    > p {
      font-size: 24px;

      ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 18px;
      `};
    }
  }
`

type CowBalanceProps = Omit<CowSubsidyInfoProps, 'subsidy'> & {
  title?: string
}

const CowBalance = ({ balance, title }: CowBalanceProps) => {
  return (
    <Wrapper>
      <CowProtocolLogo size={80} />

      {title && (
        <ClaimSummaryTitle>
          <Trans>{title}</Trans>
        </ClaimSummaryTitle>
      )}

      <div>
        <ClaimTotal>
          <b>Your combined balance</b>
          <p>
            {' '}
            <TokenAmount amount={balance} defaultValue="0" tokenSymbol={balance?.currency} />
          </p>
        </ClaimTotal>
      </div>
    </Wrapper>
  )
}

export default CowBalance
