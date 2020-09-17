const chance = require('chance')();
const uuid = require('uuid');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');

const createUser = () => {
  const email = `${chance.first()}${chance.last()}@mailinator.com`.trim();
  return {
    name: chance.first(),
    given_name: chance.first(),
    family_name: chance.last(),
    middle_name: chance.first(),
    nickname: chance.first(),
    preferred_username: chance.first(),
    profile: chance.url(),
    picture: chance.url(),
    website: chance.url(),
    email,
    email_verified: true,
    gender: chance.gender(),
    birthdate: null,
    zoneinfo: null,
    locale: chance.locale(),
    phone_number: `+1${chance.phone({ formatted: false })}`,
    phone_number_verified: true,
    address: chance.address(),
    updated_at: null,
    'custom:last_login': null,
    'custom:app_code': 'TUV0',
    'custom:compliance_id': uuid.v4(),
    'custom:member_id': uuid.v4(),
    'custom:activation_date': chance.date(),
    'cognito:mfa_enabled': false,
    'cognito:username': email,
  }
};

const getHeaders = () => [...Object.keys(createUser())].map((elem) => ({ id: elem, title: elem }));

const usersToGenerate = process.argv[2] || 1000;

const header = getHeaders();
const csvStringifier = createCsvStringifier({
  header,
});
const fsWriteStream = fs.createWriteStream('users.csv');
fsWriteStream.write(csvStringifier.getHeaderString());

for (let i = 0; i < usersToGenerate; i += 1) {
  fsWriteStream.write(csvStringifier.stringifyRecords([createUser()]));
}
fsWriteStream.close();
