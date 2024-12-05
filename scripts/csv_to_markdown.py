import csv
from pathlib import Path
import os
import re
import uuid
DATA_DIR: Path = Path.joinpath(Path("../src"), "data")
MEMBER_DIR: Path = Path.joinpath(DATA_DIR, "4_longcards_membres")
# MEMBER_DIR: Path = Path("member_test")
EVENT_DIR: Path = Path.joinpath(DATA_DIR, "1_cards_événements")
SPLIT_PATTERN: str = r"\s|\'|\-|\_|«|»|,"


def make_yaml_header_member(name: str, mode: str, position: str) -> str:
    return (f"---\n" +
            f"uuid: {uuid.uuid4()}\n" +
            f"prettyName: {''.join(re.split(pattern=SPLIT_PATTERN, string=name))}\n\n" +
            f"title: {name}\n" +
            f"abstract: {position}\n" +
            f"---\n\n")


def make_yaml_header_event(title: str, author: str, abstract: str) -> str:
    return (f"---\n" +
            f"uuid: {uuid.uuid4()}\n" +
            f"title: \"{title}\"\n" +
            f"author: \"{author}\"\n" +
            # f"event: true\n" +
            f"abstract: \"{abstract}\"\n" +
            f"---\n\n")


def generate_markdown_page_event(event_dict: dict, main_header: str, author_header: str, abstract_header: str, photo_header: str):
    md_page: str = make_yaml_header_event(
        title=event_dict[main_header], author=event_dict[author_header], abstract=event_dict[abstract_header])
    # add photo to page
    if event_dict[photo_header] != "":
        md_page += f"![Picture for {event_dict[main_header]}]()\n\n"
    event_dict.pop(photo_header)
    for key, val in event_dict.items():
        if val != "":
            md_page += f"# {key}\n\n {val}\n\n"
    return md_page


def generate_markdown_page_member(member_dict: dict, main_header: str, position_header: str, photo_header: str):
    md_page: str = make_yaml_header_member(
        name=member_dict[main_header], position=member_dict[position_header])
    # add photo to page
    md_page += f"![Photo of {member_dict[main_header]}]()\n\n"
    member_dict.pop(photo_header)
    for key, val in member_dict.items():
        if val != "":
            md_page += f"# {key}\n\n {val}\n\n"
    return md_page


def csv_to_markdown_members(csv_file: str, main_header: str = "Prénom et Nom", position_header: str = "Fonction", photo_header: str = "Photo"):
    with open(csv_file, mode="r") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            # print(row)
            member_name: str = row[main_header]
            member_subdir: Path = Path.joinpath(
                MEMBER_DIR, ("_".join(member_name.split())).lower())
            print(member_subdir)
            member_subdir.mkdir(parents=True, exist_ok=True)
            with open(Path.joinpath(member_subdir, "index.md"), mode="w") as md_file:
                md_file.write(generate_markdown_page_member(member_dict=row,
                                                            main_header=main_header, position_header=position_header, photo_header=photo_header))
    return


def csv_to_markdown_events(csv_file: str, main_header: str = "Titre", author_header: str = "Organisateur(s)", abstract_header: str = "Descriptif", photo_header: str = "Photo"):
    with open(csv_file, mode="r") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            print(row)
            title: str = row[main_header]
            event_subdir: Path = Path.joinpath(
                EVENT_DIR, ('_'.join(
                    re.split(pattern=SPLIT_PATTERN, string=title)).lower()))
            print(event_subdir)
            event_subdir.mkdir(parents=True, exist_ok=True)
            with open(Path.joinpath(event_subdir, "index.md"), mode="w") as md_file:
                md_file.write(generate_markdown_page_event(event_dict=row, main_header=main_header,
                              author_header=author_header, abstract_header=abstract_header, photo_header=photo_header))
    return


# Example usage:
csv_file_member = '../HDEA-data/hdea-researchers.csv'
csv_file_event = "../HDEA-data/calendrier_hdea.csv"

# csv_to_markdown_members(csv_file_member)
csv_to_markdown_events(csv_file_event)
