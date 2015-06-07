module.exports = {
  "100": '"Pi" (basic) attributes of demographic data did not match.',
  "200": '"Pa" (address) attributes of demographic data did not match',
  "300": 'Biometric data did not match',
  "310": 'Duplicate fingers used',
  "311": 'Duplicate Irises used.',
  "312": 'FMR and FIR cannot be used in same transaction',
  "313": 'Single FIR record contains more than one finger',
  "314": 'Number of FMR/FIR should not exceed 10',
  "315": 'Number of IIR should not exceed 2',
  "400": 'Invalid OTP value',
  "401": 'Invalid TKN value',
  "500": 'Invalid encryption of Skey',
  "501": 'Invalid certificate identifier in "ci" attribute of "Skey"',
  "502": 'Invalid encryption of Pid',
  "503": 'Invalid encryption of Hmac',
  "504": 'Session key re-initiation required due texpiry or key out of sync',
  "505": 'Synchronized Key usage not allowed for the AUA',
  "510": 'Invalid Auth XML format',
  "511": 'Invalid PID XML format',
  "520": 'Invalid device',
  "521": 'Invalid FDC code under Meta tag',
  "522": 'Invalid IDC code under Meta tag',
  "530": 'Invalid authenticator code',
  "540": 'Invalid Auth XML version',
  "541": 'Invalid PID XML version',
  "542": 'AUA not authorized for ASA. This error will be returned if AUA and ASA dnot have linking in the portal',
  "543": 'Sub-AUA not associated with "AUA". This error will be returned if Sub-AUA specified in "sa" attribute is not added as "Sub-AUA" in portal',
  "550": 'Invalid "Uses" element attributes',
  "551": 'Invalid "tid" value for registered device',
  "552": 'Invalid registered device key, please reset',
  "553": 'Invalid registered device HOTP, please reset',
  "554": 'Invalid registered device encryption',
  "555": 'Mandatory reset required for registered device',
  "561": 'Request expired ("Pid->ts" value is older than N hours where N is a configured threshold in authentication server)',
  "562": 'Timestamp value is future time (value specified "Pid->ts" is ahead of authentication server time beyond acceptable threshold)',
  "563": 'Duplicate request (this error occurs when exactly same authentication request was re-sent by AUA)',
  "564": 'HMAC Validation failed',
  "565": 'AUA license has expired',
  "566": 'Invalid non-decryptable license key',
  "567": 'Invalid input (this error occurs when some unsupported characters were found in Indian language values, "lname" or "lav")',
  "568": 'Unsupported Language',
  "569": 'Digital signature verification failed (means that authentication request XML was modified after it was signed)',
  "570": 'Invalid key infin digital signature (this means that certificate used for signing the authentication request is not valid: it is either expired, or does not belong tthe AUA or is not created by a well-known Certification Authority)',
  "571": 'PIN Requires reset (this error will be returned if resident is using the default PIN which needs tbe reset before usage)',
  "572": 'Invalid biometric position',
  "573": 'Pi usage not allowed as per license',
  "574": 'Pa usage not allowed as per license',
  "575": 'Pfa usage not allowed as per license',
  "576": 'FMR usage not allowed as per license',
  "577": 'FIR usage not allowed as per license',
  "578": 'IIR usage not allowed as per license',
  "579": 'OTP usage not allowed as per license',
  "580": 'PIN usage not allowed as per license',
  "581": 'Fuzzy matching usage not allowed as per license',
  "582": 'Local language usage not allowed as per license',
  "584": 'Invalid pincode in LOV attribute under Meta tag',
  "585": 'Invalid geo-code in LOV attribute under Meta tag',
  "710": 'Missing "Pi" data as specified in "Uses"',
  "720": 'Missing "Pa" data as specified in "Uses"',
  "721": 'Missing "Pfa" data as specified in "Uses"',
  "730": 'Missing PIN data as specified in "Uses"',
  "740": 'Missing OTP data as specified in "Uses"',
  "800": 'Invalid biometric data',
  "810": 'Missing biometric data as specified in "Uses"',
  "811": 'Missing biometric data in CIDR for the given Aadhaar number',
  "812": 'Resident has not done "Best Finger Detection". Application should initiate BFD application thelp resident identify their best fingers. See Aadhaar Best Finger Detection API specification.',
  "820": 'Missing or empty value for "bt" attribute in "Uses" element',
  "821": 'Invalid value in the "bt" attribute of "Uses" element',
  "901": 'Nauthentication data found in the request (this corresponds ta scenariwherein none of the auth data: Demo, Pv, or Bios: is present)',
  "902": 'Invalid "dob" value in the "Pi" element (this corresponds ta scenarios wherein "dob" attribute is not of the format "YYYY" or "YYYYMM-DD", or the age of resident is not in valid range)',
  "910": 'Invalid "mv" value in the "Pi" element',
  "911": 'Invalid "mv" value in the "Pfa" element',
  "912": 'Invalid "ms" value',
  "913": 'Both "Pa" and "Pfa" are present in the authentication request (Pa and Pfa are mutually exclusive)',
  "930": 'Technical error that are internal tauthentication server',
  "931": 'Technical error that are internal tauthentication server',
  "932": 'Technical error that are internal tauthentication server',
  "933": 'Technical error that are internal tauthentication server',
  "934": 'Technical error that are internal tauthentication server',
  "935": 'Technical error that are internal tauthentication server',
  "936": 'Technical error that are internal tauthentication server',
  "937": 'Technical error that are internal tauthentication server',
  "938": 'Technical error that are internal tauthentication server',
  "939": 'Technical error that are internal tauthentication server',
  "940": 'Unauthorized ASA channel',
  "941": 'Unspecified ASA channel',
  "980": 'Unsupported option',
  "997": 'Invalid Aadhaar status (Aadhaar is not in authenticatable status)',
  "998": 'Invalid Aadhaar Number',
  "999": 'Unknown error',
  "K-100": 'Resident authentication failed',
  "K-200": 'Resident data currently not available',
  "K-540": 'Invalid KYC XML',
  "K-541": 'Invalid e-KYC API version',
  "K-542": 'Invalid resident consent ("rc" attribute in "Kyc" element)',
  "K-543": 'Invalid timestamp ("ts" attribute in "Kyc" element)',
  "K-544": 'Invalid resident auth type ("ra" attribute in "Kyc" element does not match what is in PID block)',
  "K-545": 'Resident has opted-out of this service',
  "K-550": 'Invalid Uses Attribute',
  "K-551": 'Invalid "Txn" namespace',
  "K-552": 'Invalid License key',
  "K-569": 'Digital signature verification failed for e-KYC XML',
  "K-570": 'Invalid key infin digital signature for e-KYC XML (it is either expired, or does not belong tthe AUA or is not created by a well-known Certification Authority)',
  "K-600": 'AUA is invalid or not an authorized KUA',
  "K-601": 'ASA is invalid or not an authorized KSA',
  "K-602": 'KUA encryption key not available',
  "K-603": 'KSA encryption key not available',
  "K-604": 'KSA Signature not allowed',
  "K-605": 'Neither KUA key nor KSA encryption key are available',
  "K-955": 'Technical Failure',
  "K-999": 'Unknown error',
}
