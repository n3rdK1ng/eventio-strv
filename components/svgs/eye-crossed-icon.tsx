import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const EyeCrossedIcon = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M17.698 18.062L5.445 5.823a.58.58 0 010-.798.575.575 0 01.805 0l12.247 12.239c.22.227.241.556 0 .798a.541.541 0 01-.799 0zm.689-2.117L15.75 13.28c.22-.469.344-1.003.344-1.56A4.065 4.065 0 0012 7.64c-.564 0-1.091.118-1.575.323L8.521 6.058A11.065 11.065 0 0112 5.494c5.86 0 9.924 4.738 9.924 6.225 0 .872-1.399 2.813-3.537 4.226zm-6.387 2c-5.793 0-9.932-4.746-9.932-6.226 0-.879 1.443-2.907 3.75-4.35l2.505 2.52a4.13 4.13 0 00-.425 1.83A4.1 4.1 0 0012 15.8a3.94 3.94 0 001.802-.432l1.919 1.919a10.71 10.71 0 01-3.721.659zm2.33-6.38c0 .096-.008.198-.015.286l-2.593-2.593c.088-.007.183-.014.278-.014a2.32 2.32 0 012.33 2.321zm-4.666-.014c0-.103.007-.213.014-.315l2.63 2.63c-.103.007-.198.014-.3.014-1.282 0-2.344-1.04-2.344-2.33z"
				fill="#72727B"
			/>
		</Svg>
	)
}
