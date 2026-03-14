import requests
import json
import uuid

BASE_URL = "http://localhost:8000/api"

def test_isolation():
    print("--- Starting End-to-End Isolation Test ---")
    
    user_a_phone = f"999{str(uuid.uuid4().int)[:7]}"
    user_b_phone = f"888{str(uuid.uuid4().int)[:7]}"
    
    print(f"Generated User A Phone: {user_a_phone}")
    print(f"Generated User B Phone: {user_b_phone}")

    # 1. Signup User A
    print("\n--- Signing up User A ---")
    res_a = requests.post(f"{BASE_URL}/auth/signup", json={
        "username": "User A",
        "phone": user_a_phone,
        "password": "password123",
        "mpin": "1234",
        "role": "citizen"
    })
    print(res_a.json())
    assert res_a.status_code == 200

    # 2. Login User A
    print("\n--- Logging in User A ---")
    login_a = requests.post(f"{BASE_URL}/auth/login", json={
        "phone": user_a_phone,
        "mpin": "1234"
    })
    data_a = login_a.json()
    print(data_a)
    assert login_a.status_code == 200
    token_a = data_a["token"]
    user_id_a = data_a["user_id"]
    
    # 3. Check Profile User A
    print("\n--- Fetching Profile User A ---")
    prof_a = requests.get(f"{BASE_URL}/users/me?user_id={user_id_a}")
    print(prof_a.json())
    assert prof_a.json()["username"] == "User A"

    # 4. Submit Complaint User A
    print("\n--- Submitting Complaint for User A ---")
    comp_a = requests.post(f"{BASE_URL}/complaints", json={
        "user_id": user_id_a,
        "complaint_text": "Broken pipe on User A street",
        "latitude": 12.9,
        "longitude": 77.5,
        "department": "Water",
        "priority": "high"
    })
    print(comp_a.json())
    assert comp_a.status_code == 200

    # 5. Check Dashboard User A
    print("\n--- Fetching Dashboard User A ---")
    dash_a = requests.get(f"{BASE_URL}/citizen/my-complaints?user_id={user_id_a}")
    complaints_a = dash_a.json()["complaints"]
    print(f"User A has {len(complaints_a)} complaints.")
    assert len(complaints_a) == 1
    assert complaints_a[0]["complaint_text"] == "Broken pipe on User A street"

    # 6. Signup User B
    print("\n--- Signing up User B ---")
    res_b = requests.post(f"{BASE_URL}/auth/signup", json={
        "username": "User B",
        "phone": user_b_phone,
        "password": "password123",
        "mpin": "4321",
        "role": "citizen"
    })
    print(res_b.json())
    assert res_b.status_code == 200

    # 7. Login User B
    print("\n--- Logging in User B ---")
    login_b = requests.post(f"{BASE_URL}/auth/login", json={
        "phone": user_b_phone,
        "mpin": "4321"
    })
    data_b = login_b.json()
    print(data_b)
    assert login_b.status_code == 200
    user_id_b = data_b["user_id"]

    # 8. Check Profile User B
    print("\n--- Fetching Profile User B ---")
    prof_b = requests.get(f"{BASE_URL}/users/me?user_id={user_id_b}")
    print(prof_b.json())
    assert prof_b.json()["username"] == "User B"

    # 9. Check Dashboard User B (Should be empty)
    print("\n--- Fetching Dashboard User B ---")
    dash_b = requests.get(f"{BASE_URL}/citizen/my-complaints?user_id={user_id_b}")
    complaints_b = dash_b.json()["complaints"]
    print(f"User B has {len(complaints_b)} complaints.")
    assert len(complaints_b) == 0

    print("\n✅ End-to-End Isolation Verification Complete! User A and User B data are strictly isolated.")

if __name__ == "__main__":
    test_isolation()
