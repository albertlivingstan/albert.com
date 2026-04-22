import xml.etree.ElementTree as ET
import base64

tree = ET.parse('./public/Albert.svg')
root = tree.getroot()
ns = {'svg': 'http://www.w3.org/2000/svg', 'xlink': 'http://www.w3.org/1999/xlink'}
image = root.find('.//svg:image', ns)
href = image.attrib['{http://www.w3.org/1999/xlink}href']
if href.startswith('data:image/jpeg;base64,'):
    data = href.replace('data:image/jpeg;base64,', '')
    with open('./public/Albert_original.jpg', 'wb') as f:
        f.write(base64.b64decode(data))
