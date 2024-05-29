import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const PlusIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M12.99 20.91h-1.98v-7.92H3.09v-1.98h7.92V3.09h1.98v7.92h7.92v1.98h-7.92v7.92z"
				fill="currentColor"
			/>
		</Svg>
	)
}
