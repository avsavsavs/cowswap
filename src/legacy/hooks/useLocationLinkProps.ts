import { sendEvent } from 'legacy/components/analytics'
import { SupportedLocale } from 'legacy/constants/locales'
import { LocationDescriptor } from 'history'
import useParsedQueryString from 'legacy/hooks/useParsedQueryString'
import { stringify } from 'qs'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useActiveLocale } from './useActiveLocale'

export function useLocationLinkProps(locale: SupportedLocale | null): {
  to?: LocationDescriptor
  onClick?: () => void
} {
  const location = useLocation()
  const qs = useParsedQueryString()
  const activeLocale = useActiveLocale()

  return useMemo(
    () =>
      !locale
        ? {}
        : {
            to: {
              ...location,
              search: stringify({ ...qs, lng: locale }),
            },
            onClick: () => {
              sendEvent({
                category: 'Localization',
                action: 'Switch Locale',
                label: `${activeLocale} -> ${locale}`,
              })
            },
          },
    [location, qs, activeLocale, locale]
  )
}
