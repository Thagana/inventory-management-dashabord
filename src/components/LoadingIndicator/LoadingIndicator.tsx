import { Flex } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function LoadingIndicator () {
  return (
    <Flex
      gap="middle"
      align="center"
      justify="center"
      className="loading-container"
    >
      <div>
        <LoadingOutlined />
      </div>
    </Flex>
  )
}
