import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const GridIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M2.977 11.119c-.93 0-1.4-.47-1.4-1.436V6.41c0-.967.47-1.428 1.4-1.428h3.34c.93 0 1.398.461 1.398 1.428v3.274c0 .967-.468 1.436-1.399 1.436h-3.34zm7.353 0c-.937 0-1.406-.47-1.406-1.436V6.41c0-.967.469-1.428 1.406-1.428h3.333c.93 0 1.399.461 1.399 1.428v3.274c0 .967-.47 1.436-1.4 1.436H10.33zm7.346 0c-.93 0-1.399-.47-1.399-1.436V6.41c0-.967.47-1.428 1.4-1.428h3.34c.93 0 1.398.461 1.398 1.428v3.274c0 .967-.469 1.436-1.399 1.436h-3.34zm-14.7 7.346c-.93 0-1.398-.462-1.398-1.428v-3.282c0-.96.468-1.428 1.399-1.428h3.34c.93 0 1.398.469 1.398 1.428v3.282c0 .966-.468 1.428-1.399 1.428h-3.34zm7.354 0c-.937 0-1.406-.462-1.406-1.428v-3.282c0-.96.469-1.428 1.406-1.428h3.333c.93 0 1.399.469 1.399 1.428v3.282c0 .966-.47 1.428-1.4 1.428H10.33zm7.346 0c-.93 0-1.399-.462-1.399-1.428v-3.282c0-.96.47-1.428 1.4-1.428h3.34c.93 0 1.398.469 1.398 1.428v3.282c0 .966-.469 1.428-1.399 1.428h-3.34z"
				fill="currentColor"
			/>
		</Svg>
	)
}
