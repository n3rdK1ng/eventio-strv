import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const ArrowIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M3.381 12.302a.85.85 0 01.288-.622L9.81 5.548c.204-.204.399-.278.621-.278.455 0 .816.334.816.797a.828.828 0 01-.231.585L8.938 8.767l-3.117 2.848 2.236-.139h11.736c.482 0 .816.343.816.826 0 .482-.334.825-.816.825H8.057l-2.245-.139 3.126 2.848 2.079 2.116c.148.139.232.361.232.584 0 .464-.362.798-.817.798-.223 0-.417-.084-.603-.26l-6.16-6.15a.85.85 0 01-.288-.622z"
				fill="currentColor"
			/>
		</Svg>
	)
}
