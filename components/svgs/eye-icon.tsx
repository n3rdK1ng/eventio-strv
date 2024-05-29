import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const EyeIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M12 17.945c-5.793 0-9.932-4.746-9.932-6.226 0-1.487 4.139-6.225 9.932-6.225 5.86 0 9.924 4.738 9.924 6.225 0 1.48-4.057 6.226-9.924 6.226zm0-2.146c2.263 0 4.094-1.853 4.094-4.08A4.065 4.065 0 0012 7.64c-2.285 0-4.102 1.795-4.102 4.08A4.095 4.095 0 0012 15.8zm0-2.608c-.82 0-1.494-.666-1.494-1.472a1.491 1.491 0 012.98 0A1.49 1.49 0 0112 13.191z"
				fill="#72727B"
			/>
		</Svg>
	)
}
