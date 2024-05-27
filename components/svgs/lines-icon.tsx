import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function LinesIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M5.767 11.119c-1.12 0-1.684-.55-1.684-1.678V6.644c0-1.121.563-1.663 1.684-1.663h12.459c1.12 0 1.684.542 1.684 1.663V9.44c0 1.128-.564 1.678-1.684 1.678H5.767zm0 7.346c-1.12 0-1.684-.542-1.684-1.67V13.99c0-1.114.563-1.663 1.684-1.663h12.459c1.12 0 1.684.55 1.684 1.663v2.805c0 1.128-.564 1.67-1.684 1.67H5.767z"
				fill="#72727B"
			/>
		</Svg>
	)
}

export default LinesIcon
