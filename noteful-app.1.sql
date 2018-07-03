
DROP TABLE IF EXISTS notes;

SELECT now();

create table notes(
    id serial PRIMARY KEY,
    title text not null,
    content text,
    created timestamp DEFAULT now()
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000; --start with 1000

INSERT INTO notes ( 
    title, content) VALUES
('5 life lessons learned from cats', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'),
('What the government doesn''t want you to know about cats', 'Posuere sollicitudin aliquam ultrices sagittis orci a.'),
('The most boring article about cats you''ll ever read','Lorem ipsum dolor sit amet, consectetur adipiscing elit' ),
('7 things lady gaga has in common with cats', 'Posuere sollicitudin aliquam ultrices sagittis orci a.'),
('The most incredible article about cats you''ll ever read', 'Lorem ipsum dolor sit amet, boring consectetur adipiscing elit,'),
('10 ways cats can help you live to 100', 'Posuere sollicitudin aliquam'),
('9 reasons you can blame the recession on cats', 'adsfsadfadsfdsafasdf'),
('10 ways marketers are making you addicted to cats','ayrjuyjkyhjkhgjkhj'),
('11 ways investing in cats can make you a millionaire', 'ewqrwdfasdfasdfa'),
('Why you should forget everything you learned about cats', 'awerqwerqe3w98rjdsvoiusdmf' );
